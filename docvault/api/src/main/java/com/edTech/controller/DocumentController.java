package com.edTech.controller;

import com.edTech.dto.DocumentResponseDTO;
import com.edTech.model.User;
import com.edTech.service.DocumentService;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
      Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(documentService.uploadDocument(file, title, projectId, user.getId()));
  }

  @GetMapping
  public ResponseEntity<Page<DocumentResponseDTO>> listDocuments(
      @RequestParam(required = false) UUID projectId,
      @RequestParam(required = false) String title,
      @PageableDefault(size = 20) Pageable pageable,
      Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.ok(
        documentService.listDocumentsByUser(user.getId(), projectId, title, pageable));
  }

  @GetMapping("/{id}/download")
  public ResponseEntity<String> downloadDocument(
      @PathVariable UUID id, Authentication authentication) {
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
  public ResponseEntity<DocumentResponseDTO> updateDocumentStatus(
      @PathVariable UUID id,
      @RequestBody com.edTech.dto.DocumentStatusUpdateDTO dto,
      Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    DocumentResponseDTO response =
        documentService.reviewDocument(id, user.getId(), dto.getStatus(), dto.getFeedback());
    return ResponseEntity.ok(response);
  }
}
