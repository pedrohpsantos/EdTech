package com.edtech.controller;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.edtech.dto.ComplianceStatsDto;
import com.edtech.model.Document;
import com.edtech.model.DocumentStatus;
import com.edtech.model.User;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.DocumentRepository;
import java.util.Arrays;
import java.util.Collections;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

class ComplianceControllerTest {

  private DocumentRepository documentRepository;
  private AuditLogRepository auditLogRepository;
  private ComplianceController complianceController;
  private Authentication authentication;
  private UUID instId;

  @BeforeEach
  void setUp() {
    documentRepository = mock(DocumentRepository.class);
    auditLogRepository = mock(AuditLogRepository.class);
    complianceController = new ComplianceController(documentRepository, auditLogRepository);
    
    instId = UUID.randomUUID();
    User mockUser = mock(User.class);
    when(mockUser.getInstitutionId()).thenReturn(instId);
    
    authentication = mock(Authentication.class);
    when(authentication.getPrincipal()).thenReturn(mockUser);
  }

  @Test
  void getComplianceStats_WithZeroDocuments() {
    when(documentRepository.findAll()).thenReturn(Collections.emptyList());
    when(auditLogRepository.count()).thenReturn(10L);

    ResponseEntity<ComplianceStatsDto> response = complianceController.getComplianceStats(authentication);

    ComplianceStatsDto body = response.getBody();
    assertNotNull(body);
    assertAll(
        () -> assertEquals(100, body.getScore()),
        () -> assertEquals(4, body.getScoreTrend()),
        () -> assertEquals(3, body.getCompliantPolicies()),
        () -> assertEquals(5, body.getTotalPolicies()),
        () -> assertEquals(0, body.getPendingItems()),
        () -> assertEquals(10, body.getTotalEvents()),
        () -> assertEquals(5, body.getPolicies().size()));

    assertPolicy(
        body.getPolicies().get(0),
        "Anonimização de dados pessoais (LGPD)",
        "conforme",
        100,
        "Sem documentos avaliados");
    assertPolicy(
        body.getPolicies().get(1),
        "Termo de consentimento informado",
        "conforme",
        100,
        "Sem documentos avaliados");
    assertPolicy(
        body.getPolicies().get(2),
        "Versionamento e cadeia de custódia",
        "conforme",
        100,
        "Sem documentos avaliados");
    assertPolicy(
        body.getPolicies().get(3),
        "Retenção e descarte de dados",
        "conforme",
        100,
        "Sem documentos pendentes");
    assertPolicy(
        body.getPolicies().get(4),
        "Aprovação do comitê de ética",
        "conforme",
        100,
        "Todos os projetos");
  }

  @Test
  void getComplianceStats_WithDocuments() {
    Document doc1 = new Document();
    doc1.setStatus(DocumentStatus.APPROVED);
    doc1.setInstitutionId(instId);
    Document doc2 = new Document();
    doc2.setStatus(DocumentStatus.PENDING_REVIEW);
    doc2.setInstitutionId(instId);

    when(documentRepository.findAll()).thenReturn(Arrays.asList(doc1, doc2));
    when(auditLogRepository.count()).thenReturn(5L);

    ResponseEntity<ComplianceStatsDto> response = complianceController.getComplianceStats(authentication);

    ComplianceStatsDto body = response.getBody();
    assertNotNull(body);
    assertAll(
        () -> assertEquals(50, body.getScore()),
        () -> assertEquals(1, body.getPendingItems()),
        () -> assertEquals(5, body.getTotalEvents()),
        () -> assertEquals(5, body.getPolicies().size()));

    assertPolicy(
        body.getPolicies().get(0),
        "Anonimização de dados pessoais (LGPD)",
        "conforme",
        100,
        "2/2 documentos");
    assertPolicy(
        body.getPolicies().get(1),
        "Termo de consentimento informado",
        "pendente",
        50,
        "1/2 documentos");
    assertPolicy(
        body.getPolicies().get(2),
        "Versionamento e cadeia de custódia",
        "conforme",
        96,
        "1/2 documentos");
    assertPolicy(
        body.getPolicies().get(3),
        "Retenção e descarte de dados",
        "pendente",
        58,
        "1/2 documentos pendentes");
    assertPolicy(
        body.getPolicies().get(4),
        "Aprovação do comitê de ética",
        "conforme",
        100,
        "Todos os projetos");
  }

  @Test
  void getComplianceStats_WithMostlyApprovedDocuments_ReturnsPartialPolicy() {
    Document approved1 = new Document();
    approved1.setStatus(DocumentStatus.APPROVED);
    approved1.setInstitutionId(instId);
    Document approved2 = new Document();
    approved2.setStatus(DocumentStatus.APPROVED);
    approved2.setInstitutionId(instId);
    Document pending = new Document();
    pending.setStatus(DocumentStatus.PENDING_REVIEW);
    pending.setInstitutionId(instId);

    when(documentRepository.findAll()).thenReturn(Arrays.asList(approved1, approved2, pending));
    when(auditLogRepository.count()).thenReturn(7L);

    ResponseEntity<ComplianceStatsDto> response = complianceController.getComplianceStats(authentication);

    ComplianceStatsDto body = response.getBody();
    assertNotNull(body);
    assertAll(
        () -> assertEquals(67, body.getScore()),
        () -> assertEquals(1, body.getPendingItems()),
        () -> assertEquals(7, body.getTotalEvents()));
    assertPolicy(
        body.getPolicies().get(1),
        "Termo de consentimento informado",
        "parcial",
        67,
        "2/3 documentos");
    assertPolicy(
        body.getPolicies().get(2),
        "Versionamento e cadeia de custódia",
        "conforme",
        96,
        "2/3 documentos");
  }

  @Test
  void getComplianceStats_WithAllDocumentsApproved_ReturnsCompliantPolicy() {
    Document approved1 = new Document();
    approved1.setStatus(DocumentStatus.APPROVED);
    approved1.setInstitutionId(instId);
    Document approved2 = new Document();
    approved2.setStatus(DocumentStatus.APPROVED);
    approved2.setInstitutionId(instId);

    when(documentRepository.findAll()).thenReturn(Arrays.asList(approved1, approved2));
    when(auditLogRepository.count()).thenReturn(2L);

    ResponseEntity<ComplianceStatsDto> response = complianceController.getComplianceStats(authentication);

    ComplianceStatsDto body = response.getBody();
    assertNotNull(body);
    assertAll(
        () -> assertEquals(100, body.getScore()),
        () -> assertEquals(0, body.getPendingItems()),
        () -> assertEquals(2, body.getTotalEvents()));
    assertPolicy(
        body.getPolicies().get(1),
        "Termo de consentimento informado",
        "conforme",
        100,
        "2/2 documentos");
    assertPolicy(
        body.getPolicies().get(3),
        "Retenção e descarte de dados",
        "pendente",
        58,
        "0/2 documentos pendentes");
  }

  private static void assertPolicy(
      ComplianceStatsDto.PolicyDto policy,
      String expectedName,
      String expectedStatus,
      int expectedPercentage,
      String expectedText) {
    assertAll(
        () -> assertEquals(expectedName, policy.getName()),
        () -> assertEquals(expectedStatus, policy.getStatus()),
        () -> assertEquals(expectedPercentage, policy.getPercentage()),
        () -> assertEquals(expectedText, policy.getText()));
  }
}
