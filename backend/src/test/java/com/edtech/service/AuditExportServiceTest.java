package com.edtech.service;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import com.edtech.model.AuditLog;
import com.edtech.model.Document;
import com.edtech.model.Project;
import com.edtech.model.ProjectMember;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.DocumentRepository;
import com.edtech.repository.ProjectMemberRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AuditExportServiceTest {

  private AuditLogRepository auditLogRepository;
  private DocumentRepository documentRepository;
  private ProjectMemberRepository projectMemberRepository;
  private AuditTrailCsvExporter csvExporter;
  private AuditExportService auditExportService;

  @BeforeEach
  void setUp() {
    auditLogRepository = mock(AuditLogRepository.class);
    documentRepository = mock(DocumentRepository.class);
    projectMemberRepository = mock(ProjectMemberRepository.class);
    csvExporter = mock(AuditTrailCsvExporter.class);
    auditExportService =
        new AuditExportService(
            auditLogRepository, documentRepository, projectMemberRepository, csvExporter);
  }

  @Test
  void exportDocumentAuditTrail_WithCsvFormat_ReturnsExporterBytes() {
    UUID documentId = UUID.randomUUID();
    UUID projectId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Document document = documentWithProject(projectId);
    ProjectMember member = new ProjectMember();
    List<AuditLog> logs =
        List.of(
            new AuditLog(
                UUID.randomUUID(),
                UUID.randomUUID(),
                com.edtech.model.AcaoAuditoria.LOGIN_SUCCESS,
                "test",
                null,
                "192.168.0.1",
                "Login ok"));
    byte[] csv = "action,resource".getBytes();

    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, userId))
        .thenReturn(Optional.of(member));
    when(auditLogRepository.findByResourceTypeAndResourceIdOrderByCreatedAtAsc(
            "Document", documentId))
        .thenReturn(logs);
    when(csvExporter.export(logs)).thenReturn(csv);

    byte[] result = auditExportService.exportDocumentAuditTrail(documentId, userId, "CSV");

    assertArrayEquals(csv, result);
    verify(csvExporter).export(logs);
  }

  @Test
  void exportDocumentAuditTrail_WithNullFormat_UsesCsvFormat() {
    UUID documentId = UUID.randomUUID();
    UUID projectId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Document document = documentWithProject(projectId);
    List<AuditLog> logs = List.of();
    byte[] csv = new byte[] {1, 2, 3};

    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, userId))
        .thenReturn(Optional.of(new ProjectMember()));
    when(auditLogRepository.findByResourceTypeAndResourceIdOrderByCreatedAtAsc(
            "Document", documentId))
        .thenReturn(logs);
    when(csvExporter.export(logs)).thenReturn(csv);

    byte[] result = auditExportService.exportDocumentAuditTrail(documentId, userId, null);

    assertArrayEquals(csv, result);
  }

  @Test
  void buildFilename_NormalizesBlankAndUppercaseFormats() {
    UUID documentId = UUID.randomUUID();

    assertEquals(
        "audit-trail-" + documentId + ".csv", auditExportService.buildFilename(documentId, ""));
    assertEquals(
        "audit-trail-" + documentId + ".csv", auditExportService.buildFilename(documentId, "CSV"));
  }

  @Test
  void exportDocumentAuditTrail_WithInvalidFormat_ThrowsBeforeRepositoryAccess() {
    UUID documentId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();

    IllegalArgumentException exception =
        assertThrows(
            IllegalArgumentException.class,
            () -> auditExportService.exportDocumentAuditTrail(documentId, userId, "pdf"));

    assertEquals("Formato invalido. Use: csv", exception.getMessage());
    verifyNoInteractions(
        documentRepository, projectMemberRepository, auditLogRepository, csvExporter);
  }

  @Test
  void exportDocumentAuditTrail_WhenDocumentDoesNotExist_Throws() {
    UUID documentId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();

    when(documentRepository.findById(documentId)).thenReturn(Optional.empty());

    RuntimeException exception =
        assertThrows(
            RuntimeException.class,
            () -> auditExportService.exportDocumentAuditTrail(documentId, userId, "csv"));

    assertEquals("Document not found", exception.getMessage());
    verifyNoInteractions(projectMemberRepository, auditLogRepository, csvExporter);
  }

  @Test
  void exportDocumentAuditTrail_WhenUserIsNotProjectMember_Throws() {
    UUID documentId = UUID.randomUUID();
    UUID projectId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Document document = documentWithProject(projectId);

    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, userId))
        .thenReturn(Optional.empty());

    RuntimeException exception =
        assertThrows(
            RuntimeException.class,
            () -> auditExportService.exportDocumentAuditTrail(documentId, userId, "csv"));

    assertEquals("Access denied: You are not a member of this project", exception.getMessage());
    verifyNoInteractions(auditLogRepository, csvExporter);
  }

  private static Document documentWithProject(UUID projectId) {
    Project project = new Project();
    project.setId(projectId);
    Document document = new Document();
    document.setProject(project);
    return document;
  }
}
