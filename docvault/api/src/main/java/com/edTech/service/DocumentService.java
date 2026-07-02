package com.edTech.service;

import com.edTech.dto.DocumentResponseDTO;
import com.edTech.dto.DocumentStatusUpdateDTO;
import com.edTech.model.AcaoAuditoria;
import com.edTech.model.Document;
import com.edTech.model.DocumentStatus;
import com.edTech.model.Project;
import com.edTech.model.ProjectRole;
import com.edTech.model.User;
import com.edTech.repository.DocumentRepository;
import com.edTech.repository.ProjectMemberRepository;
import com.edTech.repository.ProjectRepository;
import com.edTech.repository.UserRepository;
import com.edTech.model.ProjectMember;
import com.edTech.model.ProjectRole;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.apache.tika.Tika;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final AuditLogService auditLogService;
    private final StorageService storageService;
    private final Tika tika = new Tika();

    public DocumentService(DocumentRepository documentRepository, 
                           ProjectRepository projectRepository, 
                           UserRepository userRepository, 
                           ProjectMemberRepository projectMemberRepository, 
                           AuditLogService auditLogService, 
                           StorageService storageService) {
        this.documentRepository = documentRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.projectMemberRepository = projectMemberRepository;
        this.auditLogService = auditLogService;
        this.storageService = storageService;
    }

    @Transactional
    public DocumentResponseDTO uploadDocument(MultipartFile file, String title, UUID projectId, UUID authorId) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Author not found"));
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        projectMemberRepository.findByProjectIdAndUserId(projectId, authorId)
                .orElseThrow(() -> new RuntimeException("Author is not a member of the project"));

        // Validação de segurança estrita (MIME Type via Tika) mitigação SEC-004
        try {
            String detectedType = tika.detect(file.getInputStream());
            if (!"application/pdf".equalsIgnoreCase(detectedType)) {
                throw new IllegalArgumentException("Apenas arquivos PDF reais sao permitidos. Tipo detectado: " + detectedType);
            }
        } catch (IOException e) {
            throw new RuntimeException("Falha ao analisar o conteudo do arquivo", e);
        }
        
        String contentType = file.getContentType();

        try {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null) {
                throw new IllegalArgumentException("Filename cannot be null");
            }
            // A chave do objeto no S3
            String fileKey = UUID.randomUUID() + "_" + originalFilename;

            storageService.uploadFile(file, fileKey, contentType);

            Document document = new Document();
            document.setTitle(title);
            document.setFileUrl(fileKey);
            document.setStatus(DocumentStatus.DRAFT);
            document.setAuthor(author);
            document.setProject(project);

            document = documentRepository.save(document);

            auditLogService.logAction(authorId, AcaoAuditoria.UPLOAD_SUCCESS, "Documento anexado no S3: " + title);

            return mapToDTO(document);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file for upload");
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file to S3: " + e.getMessage());
        }
    }

    public String getPresignedUrl(UUID documentId, UUID userId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));
        
        // Valida se o usuário tem permissão para acessar o projeto do documento
        projectMemberRepository.findByProjectIdAndUserId(document.getProject().getId(), userId)
                .orElseThrow(() -> new RuntimeException("Access denied: You are not a member of this project"));

        String presignedUrl;
        try {
            presignedUrl = storageService.getPresignedUrl(document.getFileUrl());
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate presigned URL", e);
        }
        
        auditLogService.logAction(userId, AcaoAuditoria.UPLOAD_SUCCESS, "Gerada URL presigned para download: " + document.getTitle());
        return presignedUrl;
    }

    public Page<DocumentResponseDTO> listDocumentsByUser(UUID userId, UUID projectId, String title, Pageable pageable) {
        return documentRepository.findDocumentsByUserIdAndFilters(userId, projectId, title, pageable)
                .map(this::mapToDTO);
    }

    @Transactional
    public void deleteDocument(UUID documentId, UUID userId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        if (!document.getAuthor().getId().equals(userId)) {
            throw new RuntimeException("Only the author can delete this document");
        }
        if (document.getStatus() != DocumentStatus.DRAFT) {
            throw new RuntimeException("Only DRAFT documents can be deleted");
        }

        // Deletar também do S3 poderia ser feito aqui, mas omitido por simplicidade ou soft-delete futuro
        documentRepository.delete(document);
        auditLogService.logAction(userId, AcaoAuditoria.DELETE_DOCUMENT, "Documento excluido: " + document.getTitle());
    }

    private DocumentResponseDTO mapToDTO(Document document) {
        DocumentResponseDTO dto = new DocumentResponseDTO();
        dto.setId(document.getId());
        dto.setTitle(document.getTitle());
        dto.setFileUrl(document.getFileUrl());
        dto.setStatus(document.getStatus());
        dto.setAuthorId(document.getAuthor().getId());
        dto.setProjectId(document.getProject().getId());
        dto.setCreatedAt(document.getCreatedAt());
        dto.setFeedback(document.getFeedback());
        return dto;
    }
    @Transactional
    public DocumentResponseDTO reviewDocument(UUID documentId, UUID reviewerId, DocumentStatus newStatus, String feedback){
        if (newStatus != DocumentStatus.APPROVED && newStatus != DocumentStatus.REJECTED){
            throw new IllegalArgumentException("Status inválido. Apenas APPROVED ou REJECTED são permitidos na revisão.");
        }
        Document document = documentRepository.findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));
        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(document.getProject().getId(), reviewerId)
            .orElseThrow(() -> new RuntimeException("Acess denied: You are not a member of this project"));
        if (member.getRole() != ProjectRole.ADVISOR){
            throw new RuntimeException("Acess denied: Only an ADVISOR can review documents");
        }
        if (document.getStatus() != DocumentStatus.PENDING_REVIEW){
            throw new RuntimeException("Document is not pending review");
        }
        document.setStatus(newStatus);
        document.setFeedback(feedback);
        Document savedDocument = documentRepository.save(document);
        AcaoAuditoria acao = (newStatus == DocumentStatus.APPROVED) ? AcaoAuditoria.DOCUMENT_APPROVED : AcaoAuditoria.DOCUMENT_REJECTED;
        String details = "Status alterado para " + newStatus + ".Feedback: " + (feedback != null && !feedback.trim().isEmpty() ? feedback : "Sem feedback");
        auditLogService.logAction(reviewerId, acao, details);
        return mapToDTO(savedDocument);
    }
}
