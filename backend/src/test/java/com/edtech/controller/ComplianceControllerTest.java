package com.edtech.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.edtech.dto.ComplianceStatsDto;
import com.edtech.model.Document;
import com.edtech.model.DocumentStatus;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.DocumentRepository;
import java.util.Arrays;
import java.util.Collections;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

class ComplianceControllerTest {

  private DocumentRepository documentRepository;
  private AuditLogRepository auditLogRepository;
  private ComplianceController complianceController;

  @BeforeEach
  void setUp() {
    documentRepository = mock(DocumentRepository.class);
    auditLogRepository = mock(AuditLogRepository.class);
    complianceController = new ComplianceController(documentRepository, auditLogRepository);
  }

  @Test
  void getComplianceStats_WithZeroDocuments() {
    when(documentRepository.findAll()).thenReturn(Collections.emptyList());
    when(auditLogRepository.count()).thenReturn(10L);

    ResponseEntity<ComplianceStatsDto> response = complianceController.getComplianceStats();

    assertNotNull(response.getBody());
    assertEquals(100, response.getBody().getScore());
    assertEquals(10, response.getBody().getTotalEvents());
    assertEquals("Sem documentos avaliados", response.getBody().getPolicies().get(0).getText());
    assertEquals("conforme", response.getBody().getPolicies().get(3).getStatus());
  }

  @Test
  void getComplianceStats_WithDocuments() {
    Document doc1 = new Document();
    doc1.setStatus(DocumentStatus.APPROVED);
    Document doc2 = new Document();
    doc2.setStatus(DocumentStatus.PENDING_REVIEW);

    when(documentRepository.findAll()).thenReturn(Arrays.asList(doc1, doc2));
    when(auditLogRepository.count()).thenReturn(5L);

    ResponseEntity<ComplianceStatsDto> response = complianceController.getComplianceStats();

    assertNotNull(response.getBody());
    assertEquals(50, response.getBody().getScore());
    assertEquals(5, response.getBody().getTotalEvents());
    assertEquals("2/2 documentos", response.getBody().getPolicies().get(0).getText());
    assertEquals("pendente", response.getBody().getPolicies().get(3).getStatus());
  }
}
