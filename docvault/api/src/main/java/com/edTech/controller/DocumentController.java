package com.edTech.controller;

import com.edTech.dto.DocumentResponseDTO;
import com.edTech.model.User;
import com.edTech.service.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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
    public ResponseEntity<List<DocumentResponseDTO>> listDocuments(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(documentService.listDocumentsByUser(user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable UUID id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        documentService.deleteDocument(id, user.getId());
        return ResponseEntity.noContent().build();
    }
}
