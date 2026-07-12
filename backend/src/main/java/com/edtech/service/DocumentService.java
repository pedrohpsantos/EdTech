package com.edtech.service;

import com.edtech.dto.DocumentResponseDto;
import com.edtech.model.AuditAction;
import com.edtech.model.Document;
import com.edtech.model.DocumentStatus;
import com.edtech.model.Project;
import com.edtech.model.ProjectMember;
import com.edtech.model.ProjectRole;
import com.edtech.model.User;
import com.edtech.repository.DocumentCommentRepository;
import com.edtech.repository.DocumentRepository;
import com.edtech.repository.ProjectMemberRepository;
import com.edtech.repository.ProjectRepository;
import com.edtech.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import org.apache.tika.Tika;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/** Documentacao para DocumentService. */
@Service
public class DocumentService {

  private static final String MIME_PDF = "application/pdf";
  private static final String MIME_CSV = "text/csv";
  private static final String MIME_JSON = "application/json";
  private static final Map<String, String> ALLOWED_MIME_BY_EXTENSION =
      Map.of(".pdf", MIME_PDF, ".csv", MIME_CSV, ".json", MIME_JSON);
  private static final Set<String> CSV_COMPATIBLE_DETECTED_TYPES =
      Set.of(MIME_CSV, "text/plain", "application/csv", "application/vnd.ms-excel");
  private static final Set<String> JSON_COMPATIBLE_DETECTED_TYPES = Set.of(MIME_JSON, "text/plain");

  private final DocumentRepository documentRepository;
  private final ProjectRepository projectRepository;
  private final UserRepository userRepository;
  private final ProjectMemberRepository projectMemberRepository;
  private final DocumentCommentRepository documentCommentRepository;
  private final AuditLogService auditLogService;
  private final StorageService storageService;
  private final NotificationService notificationService;
  private final Tika tika = new Tika();
  private final ObjectMapper objectMapper = new ObjectMapper();
  private final ClamAvService clamAvService;

  /** Documentacao. */
  public DocumentService(
      DocumentRepository documentRepository,
      ProjectRepository projectRepository,
      UserRepository userRepository,
      ProjectMemberRepository projectMemberRepository,
      DocumentCommentRepository documentCommentRepository,
      AuditLogService auditLogService,
      StorageService storageService,
      NotificationService notificationService,
      ClamAvService clamAvService) {
    this.documentRepository = documentRepository;
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
    this.projectMemberRepository = projectMemberRepository;
    this.documentCommentRepository = documentCommentRepository;
    this.auditLogService = auditLogService;
    this.storageService = storageService;
    this.notificationService = notificationService;
    this.clamAvService = clamAvService;
  }

  /** Documentacao. */
  @Transactional
  public DocumentResponseDto uploadDocument(
      MultipartFile file, String title, UUID projectId, UUID authorId) {
    User author =
        userRepository
            .findById(authorId)
            .orElseThrow(() -> new RuntimeException("Author not found"));
    Project project =
        projectRepository
            .findById(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found"));

    projectMemberRepository
        .findByProjectIdAndUserId(projectId, authorId)
        .orElseThrow(() -> new RuntimeException("Author is not a member of the project"));

    try {
      String originalFilename = file.getOriginalFilename();
      if (originalFilename == null) {
        throw new IllegalArgumentException("Filename cannot be null");
      }

      String contentType = validateAllowedFile(file, originalFilename);

      if (!clamAvService.isFileSafe(file)) {
        throw new IllegalArgumentException(
            "Upload rejeitado: Assinatura de vírus detectada no arquivo.");
      }

      String fileKey = UUID.randomUUID() + "_" + originalFilename;

      storageService.uploadFile(file, fileKey, contentType);

      Document document = new Document();
      document.setTitle(title);
      document.setFileUrl(fileKey);
      document.setStatus(DocumentStatus.PENDING_REVIEW);
      document.setAuthor(author);
      document.setProject(project);

      document = documentRepository.save(document);

      auditLogService.logDocumentAction(
          authorId,
          AuditAction.UPLOAD_SUCCESS,
          document.getId(),
          "Documento anexado no Cloud Storage: " + title);

      DocumentResponseDto responseDto = mapToDto(document);
      notificationService.sendToTopic(
          "/topic/projects/" + projectId,
          Map.of("type", "DOCUMENT_UPLOADED", "document", responseDto));

      return responseDto;
    } catch (IOException e) {
      throw new RuntimeException("Falha ao analisar o conteudo do arquivo", e);
    } catch (IllegalArgumentException e) {
      throw e;
    } catch (Exception e) {
      throw new RuntimeException("Failed to upload file to Cloud Storage: " + e.getMessage());
    }
  }

  /** Documentacao para o metodo getPresignedUrl. */
  public String getPresignedUrl(UUID documentId, UUID userId) {
    Document document =
        documentRepository
            .findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));

    projectMemberRepository
        .findByProjectIdAndUserId(document.getProject().getId(), userId)
        .orElseThrow(
            () -> new RuntimeException("Access denied: You are not a member of this project"));

    String presignedUrl;
    try {
      presignedUrl = storageService.getPresignedUrl(document.getFileUrl());
    } catch (Exception e) {
      throw new RuntimeException("Failed to generate presigned URL", e);
    }

    auditLogService.logDocumentAction(
        userId,
        AuditAction.DOWNLOAD,
        documentId,
        "Gerada URL presigned para download: " + document.getTitle());
    return presignedUrl;
  }

  /** Documentacao. */
  public Page<DocumentResponseDto> listDocumentsByUser(
      UUID userId, UUID projectId, String title, DocumentStatus status, Pageable pageable) {
    return documentRepository
        .findDocumentsByUserIdAndFilters(userId, projectId, title, status, pageable)
        .map(this::mapToDto);
  }

  /** Documentacao. */
  @Transactional
  public void deleteDocument(UUID documentId, UUID userId) {
    Document document =
        documentRepository
            .findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));

    if (!document.getAuthor().getId().equals(userId)) {
      throw new RuntimeException("Only the author can delete this document");
    }
    if (document.getStatus() == DocumentStatus.APPROVED) {
      throw new RuntimeException("APPROVED documents cannot be deleted");
    }

    try {
      storageService.deleteFile(document.getFileUrl());
    } catch (Exception e) {
      throw new RuntimeException("Erro ao excluir arquivo fisico: " + e.getMessage());
    }

    documentRepository.delete(document);
    auditLogService.logDocumentAction(
        userId,
        AuditAction.DELETE_DOCUMENT,
        documentId,
        "Documento excluido: " + document.getTitle());
  }

  private String validateAllowedFile(MultipartFile file, String originalFilename)
      throws IOException {
    String extension = extractExtension(originalFilename);
    String expectedMimeType = ALLOWED_MIME_BY_EXTENSION.get(extension);
    if (expectedMimeType == null) {
      throw new IllegalArgumentException(
          "Tipo de arquivo nao permitido. Formatos aceitos: PDF, CSV e JSON.");
    }

    String declaredType = normalizeMimeType(file.getContentType());
    if (!expectedMimeType.equals(declaredType)) {
      throw new IllegalArgumentException(
          "Content-Type nao permitido para "
              + extension
              + ". Esperado: "
              + expectedMimeType
              + ". Recebido: "
              + declaredType);
    }

    String detectedType = normalizeMimeType(tika.detect(file.getInputStream(), originalFilename));
    if (!isDetectedTypeCompatible(expectedMimeType, detectedType)) {
      throw new IllegalArgumentException(
          "Conteudo do arquivo nao corresponde ao tipo permitido. Tipo detectado: " + detectedType);
    }

    if (MIME_JSON.equals(expectedMimeType)) {
      validateJsonContent(file);
    }

    return expectedMimeType;
  }

  private String extractExtension(String filename) {
    int lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex < 0 || lastDotIndex == filename.length() - 1) {
      return "";
    }
    return filename.substring(lastDotIndex).toLowerCase(Locale.ROOT);
  }

  private boolean isDetectedTypeCompatible(String expectedMimeType, String detectedType) {
    if (MIME_CSV.equals(expectedMimeType)) {
      return CSV_COMPATIBLE_DETECTED_TYPES.contains(detectedType);
    }
    if (MIME_JSON.equals(expectedMimeType)) {
      return JSON_COMPATIBLE_DETECTED_TYPES.contains(detectedType);
    }
    return expectedMimeType.equals(detectedType);
  }

  private String normalizeMimeType(String mimeType) {
    if (mimeType == null || mimeType.isBlank()) {
      return "";
    }
    return mimeType.split(";")[0].trim().toLowerCase(Locale.ROOT);
  }

  private void validateJsonContent(MultipartFile file) throws IOException {
    objectMapper.readTree(file.getInputStream());
  }

  private DocumentResponseDto mapToDto(Document document) {
    DocumentResponseDto dto = new DocumentResponseDto();
    dto.setId(document.getId());
    dto.setTitle(document.getTitle());
    dto.setFileUrl(document.getFileUrl());
    dto.setStatus(document.getStatus());
    dto.setAuthorId(document.getAuthor().getId());
    dto.setAuthorName(document.getAuthor().getName());
    dto.setAuthorEmail(document.getAuthor().getEmail());
    dto.setProjectId(document.getProject().getId());
    dto.setProjectTitle(document.getProject().getTitle());
    dto.setFileType(
        extractExtension(document.getTitle()).replace(".", "").toUpperCase(Locale.ROOT));
    dto.setCreatedAt(document.getCreatedAt());
    dto.setFeedback(document.getFeedback());
    dto.setStarred(document.isStarred());
    return dto;
  }

  /** Javadoc. */
  @Transactional(readOnly = true)
  public java.util.List<com.edtech.dto.CommentResponseDto> getComments(
      UUID documentId, UUID userId) {
    Document document =
        documentRepository
            .findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));
    projectMemberRepository
        .findByProjectIdAndUserId(document.getProject().getId(), userId)
        .orElseThrow(() -> new RuntimeException("Access denied"));

    return documentCommentRepository.findByDocumentIdOrderByCreatedAtAsc(documentId).stream()
        .map(
            c -> {
              com.edtech.dto.CommentResponseDto dto = new com.edtech.dto.CommentResponseDto();
              dto.setId(c.getId());
              dto.setContent(c.getContent());
              dto.setCreatedAt(c.getCreatedAt());
              dto.setAuthorId(c.getAuthor().getId());
              dto.setAuthorName(c.getAuthor().getName());
              return dto;
            })
        .collect(java.util.stream.Collectors.toList());
  }

  /** Javadoc. */
  @Transactional
  public com.edtech.dto.CommentResponseDto addComment(
      UUID documentId, UUID userId, String content) {
    Document document =
        documentRepository
            .findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));
    User user =
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    projectMemberRepository
        .findByProjectIdAndUserId(document.getProject().getId(), userId)
        .orElseThrow(() -> new RuntimeException("Access denied"));

    com.edtech.model.DocumentComment comment = new com.edtech.model.DocumentComment();
    comment.setDocument(document);
    comment.setAuthor(user);
    comment.setContent(content);

    comment = documentCommentRepository.save(comment);

    auditLogService.logDocumentAction(
        userId, AuditAction.REVIEW_DOCUMENT, documentId, "Adicionou um comentário ao documento.");

    com.edtech.dto.CommentResponseDto dto = new com.edtech.dto.CommentResponseDto();
    dto.setId(comment.getId());
    dto.setContent(comment.getContent());
    dto.setCreatedAt(comment.getCreatedAt());
    dto.setAuthorId(comment.getAuthor().getId());
    dto.setAuthorName(comment.getAuthor().getName());

    notificationService.sendToTopic(
        "/topic/projects/" + document.getProject().getId(),
        Map.of("type", "NEW_COMMENT", "documentId", documentId, "comment", dto));

    return dto;
  }

  /** Documentacao. */
  @Transactional
  public DocumentResponseDto reviewDocument(
      UUID documentId, UUID reviewerId, DocumentStatus newStatus, String feedback) {
    if (newStatus != DocumentStatus.APPROVED && newStatus != DocumentStatus.REJECTED) {
      throw new IllegalArgumentException(
          "Status invalido. Apenas APPROVED ou REJECTED sao permitidos na revisao.");
    }
    Document document =
        documentRepository
            .findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));
    ProjectMember member =
        projectMemberRepository
            .findByProjectIdAndUserId(document.getProject().getId(), reviewerId)
            .orElseThrow(
                () -> new RuntimeException("Acess denied: You are not a member of this project"));
    if (member.getRole() != ProjectRole.ADVISOR) {
      throw new RuntimeException("Acess denied: Only an ADVISOR can review documents");
    }
    if (document.getStatus() != DocumentStatus.PENDING_REVIEW) {
      throw new RuntimeException("Document is not pending review");
    }
    document.setStatus(newStatus);
    document.setFeedback(feedback);
    Document savedDocument = documentRepository.save(document);
    AuditAction action =
        (newStatus == DocumentStatus.APPROVED)
            ? AuditAction.DOCUMENT_APPROVED
            : AuditAction.DOCUMENT_REJECTED;
    String details =
        "Status alterado para "
            + newStatus
            + ".Feedback: "
            + (feedback != null && !feedback.trim().isEmpty() ? feedback : "Sem feedback");
    auditLogService.logDocumentAction(reviewerId, action, documentId, details);

    DocumentResponseDto responseDto = mapToDto(savedDocument);
    notificationService.sendToTopic(
        "/topic/projects/" + document.getProject().getId(),
        Map.of("type", "DOCUMENT_REVIEWED", "document", responseDto));

    return responseDto;
  }

  /** Javadoc. */
  @Transactional
  public DocumentResponseDto toggleStar(UUID documentId, UUID userId) {
    Document document =
        documentRepository
            .findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));

    projectMemberRepository
        .findByProjectIdAndUserId(document.getProject().getId(), userId)
        .orElseThrow(
            () -> new RuntimeException("Access denied: You are not a member of this project"));

    document.setStarred(!document.isStarred());
    Document savedDocument = documentRepository.save(document);

    return mapToDto(savedDocument);
  }
}
