package com.edtech.controller;

import com.edtech.dto.DocumentResponseDto;
import com.edtech.model.User;
import com.edtech.service.AuditExportService;
import com.edtech.service.DocumentService;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/** Documentacao para DocumentController. */
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

  private final DocumentService documentService;
  private final AuditExportService auditExportService;

  /** Documentacao para o metodo DocumentController. */
  public DocumentController(
      DocumentService documentService, AuditExportService auditExportService) {
    this.documentService = documentService;
    this.auditExportService = auditExportService;
  }

  /** Documentacao. */
  @PostMapping(consumes = "multipart/form-data")
  public ResponseEntity<DocumentResponseDto> uploadDocument(
      @RequestParam("file") MultipartFile file,
      @RequestParam("title") String title,
      @RequestParam("projectId") UUID projectId,
      Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(documentService.uploadDocument(file, title, projectId, user.getId()));
  }

  /** Documentacao. */
  @GetMapping
  public ResponseEntity<Page<DocumentResponseDto>> listDocuments(
      @RequestParam(required = false) UUID projectId,
      @RequestParam(required = false) String title,
      @RequestParam(required = false) com.edtech.model.DocumentStatus status,
      @PageableDefault(size = 20) Pageable pageable,
      Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.ok(
        documentService.listDocumentsByUser(user.getId(), projectId, title, status, pageable));
  }

  /** Documentacao. */
  @GetMapping("/{id}/download")
  public ResponseEntity<String> downloadDocument(
      @PathVariable UUID id, Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    String url = documentService.getPresignedUrl(id, user.getId());
    if (url != null && !url.startsWith("https://storage.googleapis.com/")) {
      throw new SecurityException("Untrusted URL source");
    }
    return ResponseEntity.ok()
        .header("X-Content-Type-Options", "nosniff")
        .header("Content-Type", "application/json")
        .body(url);
  }

  /** Exporta a trilha de auditoria de um documento em arquivo CSV. */
  @GetMapping("/{id}/audit/export")
  public ResponseEntity<byte[]> exportAuditTrail(
      @PathVariable UUID id,
      @RequestParam(defaultValue = "csv") String format,
      Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    byte[] file = auditExportService.exportDocumentAuditTrail(id, user.getId(), format);
    String filename = auditExportService.buildFilename(id, format);

    MediaType mediaType =
        "pdf".equalsIgnoreCase(format)
            ? MediaType.APPLICATION_PDF
            : MediaType.parseMediaType("text/csv");

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
        .contentType(mediaType)
        .body(file);
  }

  /** Documentacao. */
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteDocument(@PathVariable UUID id, Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    documentService.deleteDocument(id, user.getId());
    return ResponseEntity.noContent().build();
  }

  /** Documentacao. */
  @PatchMapping("/{id}/status")
  public ResponseEntity<DocumentResponseDto> updateDocumentStatus(
      @PathVariable UUID id,
      @RequestBody com.edtech.dto.DocumentStatusUpdateDto dto,
      Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    DocumentResponseDto response =
        documentService.reviewDocument(id, user.getId(), dto.getStatus(), dto.getFeedback());
    return ResponseEntity.ok(response);
  }

  @PatchMapping("/{id}/star")
  public ResponseEntity<DocumentResponseDto> toggleStar(
      @PathVariable UUID id, Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.ok(documentService.toggleStar(id, user.getId()));
  }

  @GetMapping("/{id}/comments")
  public ResponseEntity<java.util.List<com.edtech.dto.CommentResponseDto>> getComments(
      @PathVariable UUID id, Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.ok(documentService.getComments(id, user.getId()));
  }

  /** Javadoc. */
  @PostMapping("/{id}/comments")
  public ResponseEntity<com.edtech.dto.CommentResponseDto> addComment(
      @PathVariable UUID id,
      @jakarta.validation.Valid @RequestBody com.edtech.dto.CommentRequestDto dto,
      Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(documentService.addComment(id, user.getId(), dto.getContent()));
  }
}
