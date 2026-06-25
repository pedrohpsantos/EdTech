package com.edTech.controller;

import com.edTech.dto.DocumentResponseDTO;
import com.edTech.model.User;
import com.edTech.service.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.edTech.model.DocumentStatus;
import com.edTech.dto.UpdateDocumentStatusRequest;
import com.edTech.model.ProjectMember;
import com.edTech.model.ProjectRole;

import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<DocumentResponseDTO> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("projectId") UUID projectId,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED).body(documentService.uploadDocument(file, title, projectId, user.getId()));
    }

    @GetMapping
    public ResponseEntity<Page<DocumentResponseDTO>> listDocuments(
            @RequestParam(required = false) UUID projectId,
            @RequestParam(required = false) String title,
            @PageableDefault(size = 20) Pageable pageable,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(documentService.listDocumentsByUser(user.getId(), projectId, title, pageable));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<String> downloadDocument(@PathVariable UUID id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(documentService.getPresignedUrl(id, user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable UUID id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        documentService.deleteDocument(id, user.getId());
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<DocumentResponseDTO> reviewDocument(
            @PathVariable UUID id,
            @RequestBody UpdateDocumentStatusRequest request, 
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        UUID reviewerId = user.getId();
        DocumentStatus newStatus = DocumentStatus.valueOf(request.status());
        DocumentResponseDTO response = documentService.reviewDocument(id, reviewerId, newStatus, request.feedback());
        return ResponseEntity.ok(response);
        }
}
