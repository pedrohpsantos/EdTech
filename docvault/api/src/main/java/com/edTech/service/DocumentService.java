package com.edTech.service;

import com.edTech.dto.DocumentResponseDTO;
import com.edTech.model.AcaoAuditoria;
import com.edTech.model.Document;
import com.edTech.model.DocumentStatus;
import com.edTech.model.Project;
import com.edTech.model.User;
import com.edTech.repository.DocumentRepository;
import com.edTech.repository.ProjectMemberRepository;
import com.edTech.repository.ProjectRepository;
import com.edTech.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final AuditLogService auditLogService;

    private static final String UPLOAD_DIR = "uploads/";

    public DocumentService(DocumentRepository documentRepository, ProjectRepository projectRepository, UserRepository userRepository, ProjectMemberRepository projectMemberRepository, AuditLogService auditLogService) {
        this.documentRepository = documentRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.projectMemberRepository = projectMemberRepository;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public DocumentResponseDTO uploadDocument(MultipartFile file, String title, UUID projectId, UUID authorId) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Author not found"));
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        projectMemberRepository.findByProjectIdAndUserId(projectId, authorId)
                .orElseThrow(() -> new RuntimeException("Author is not a member of the project"));

        try {
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) dir.mkdirs();

            String originalFilename = file.getOriginalFilename();
            if (originalFilename != null && (originalFilename.contains("..") || originalFilename.contains("/") || originalFilename.contains("\\"))) {
                throw new IllegalArgumentException("Invalid filename");
            }
            String fileName = UUID.randomUUID() + "_" + originalFilename;
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.write(filePath, file.getBytes());

            Document document = new Document();
            document.setTitle(title);
            document.setFileUrl("/uploads/" + fileName);
            document.setStatus(DocumentStatus.DRAFT);
            document.setAuthor(author);
            document.setProject(project);

            document = documentRepository.save(document);

            auditLogService.logAction(authorId, AcaoAuditoria.UPLOAD_SUCCESS, "Documento anexado: " + title);

            return mapToDTO(document);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file");
        }
    }

    public List<DocumentResponseDTO> listDocumentsByUser(UUID userId) {
        return documentRepository.findDocumentsByUserId(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
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
        return dto;
    }
}
