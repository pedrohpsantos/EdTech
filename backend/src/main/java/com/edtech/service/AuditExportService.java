package com.edtech.service;

import com.edtech.model.AuditLog;
import com.edtech.model.Document;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.DocumentRepository;
import com.edtech.repository.ProjectMemberRepository;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.stereotype.Service;

/** Service responsavel por exportar trilhas de auditoria de documentos. */
@Service
public class AuditExportService {

  private static final String CSV_FORMAT = "csv";
  private static final String DOCUMENT_RESOURCE_TYPE = "Document";

  private final AuditLogRepository auditLogRepository;
  private final DocumentRepository documentRepository;
  private final ProjectMemberRepository projectMemberRepository;
  private final AuditTrailCsvExporter csvExporter;

  public AuditExportService(
      AuditLogRepository auditLogRepository,
      DocumentRepository documentRepository,
      ProjectMemberRepository projectMemberRepository,
      AuditTrailCsvExporter csvExporter) {
    this.auditLogRepository = auditLogRepository;
    this.documentRepository = documentRepository;
    this.projectMemberRepository = projectMemberRepository;
    this.csvExporter = csvExporter;
  }

  public byte[] exportDocumentAuditTrail(UUID documentId, UUID userId, String format) {
    String normalizedFormat = normalizeFormat(format);
    if (!CSV_FORMAT.equals(normalizedFormat)) {
      throw new IllegalArgumentException("Formato invalido. Use: csv");
    }

    Document document =
        documentRepository
            .findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));

    projectMemberRepository
        .findByProjectIdAndUserId(document.getProject().getId(), userId)
        .orElseThrow(
            () -> new RuntimeException("Access denied: You are not a member of this project"));

    List<AuditLog> logs =
        auditLogRepository.findByResourceTypeAndResourceIdOrderByCreatedAtAsc(
            DOCUMENT_RESOURCE_TYPE, documentId);

    return csvExporter.export(logs);
  }

  public String buildFilename(UUID documentId, String format) {
    return "audit-trail-" + documentId + "." + normalizeFormat(format);
  }

  private String normalizeFormat(String format) {
    if (format == null || format.isBlank()) {
      return CSV_FORMAT;
    }
    return format.toLowerCase(Locale.ROOT);
  }
}
