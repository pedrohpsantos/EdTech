package com.edtech.service;

import com.edtech.model.AuditLog;
import com.edtech.model.Document;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.DocumentRepository;
import com.edtech.repository.ProjectMemberRepository;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.stereotype.Service;

/** Service responsavel por exportar trilhas de auditoria de documentos. */
@Service
public class AuditExportService {

  private static final String CSV_FORMAT = "csv";
  private static final String PDF_FORMAT = "pdf";
  private static final String DOCUMENT_RESOURCE_TYPE = "Document";

  private final AuditLogRepository auditLogRepository;
  private final DocumentRepository documentRepository;
  private final ProjectMemberRepository projectMemberRepository;
  private final AuditTrailCsvExporter csvExporter;

  /** Cria o servico com os repositorios e exportador necessarios. */
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

  /**
   * Exporta os logs de auditoria relacionados a um documento.
   *
   * @param documentId identificador do documento.
   * @param userId identificador do usuario que solicitou a exportacao.
   * @param format formato solicitado para exportacao.
   * @return conteudo do arquivo exportado em bytes.
   */
  public byte[] exportDocumentAuditTrail(UUID documentId, UUID userId, String format) {
    String normalizedFormat = normalizeFormat(format);
    if (!CSV_FORMAT.equals(normalizedFormat) && !PDF_FORMAT.equals(normalizedFormat)) {
      throw new IllegalArgumentException("Formato invalido. Use: csv ou pdf");
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

    if (PDF_FORMAT.equals(normalizedFormat)) {
      return exportPdf(logs);
    }

    return csvExporter.export(logs);
  }

  private byte[] exportPdf(List<AuditLog> logs) {
    com.lowagie.text.Document pdfDoc = new com.lowagie.text.Document(PageSize.A4.rotate());
    ByteArrayOutputStream out = new ByteArrayOutputStream();

    try {
      PdfWriter.getInstance(pdfDoc, out);
      pdfDoc.open();

      Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
      fontTitle.setSize(18);
      Paragraph title = new Paragraph("Trilha de Auditoria do Documento", fontTitle);
      title.setAlignment(Paragraph.ALIGN_CENTER);
      pdfDoc.add(title);
      pdfDoc.add(new Paragraph(" "));

      PdfPTable table = new PdfPTable(6);
      table.setWidthPercentage(100f);
      table.setWidths(new float[] {1.5f, 2.5f, 2.0f, 2.0f, 1.5f, 4.0f});

      Font fontHeader = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
      fontHeader.setSize(10);
      String[] headers = {"ID", "Timestamp", "Ação", "Usuário ID", "IP", "Detalhes"};
      for (String header : headers) {
        PdfPCell cell = new PdfPCell();
        cell.setPhrase(new Phrase(header, fontHeader));
        table.addCell(cell);
      }

      Font fontData = FontFactory.getFont(FontFactory.HELVETICA);
      fontData.setSize(8);
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

      for (AuditLog log : logs) {
        table.addCell(new Phrase(log.getId() != null ? log.getId().toString() : "", fontData));
        table.addCell(
            new Phrase(
                log.getCreatedAt() != null ? log.getCreatedAt().format(formatter) : "", fontData));
        table.addCell(new Phrase(log.getAction() != null ? log.getAction().name() : "", fontData));
        table.addCell(
            new Phrase(log.getUserId() != null ? log.getUserId().toString() : "", fontData));
        table.addCell(new Phrase(log.getIpAddress() != null ? log.getIpAddress() : "", fontData));
        table.addCell(new Phrase(log.getDetails() != null ? log.getDetails() : "", fontData));
      }

      pdfDoc.add(table);
      pdfDoc.close();

    } catch (DocumentException e) {
      throw new RuntimeException("Erro ao gerar PDF", e);
    }

    return out.toByteArray();
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
