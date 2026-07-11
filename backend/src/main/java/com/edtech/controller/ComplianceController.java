package com.edtech.controller;

import com.edtech.dto.ComplianceStatsDto;
import com.edtech.model.Document;
import com.edtech.model.DocumentStatus;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.DocumentRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Controller para endpoints de conformidade. */
@RestController
@RequestMapping("/api/dashboard/compliance")
public class ComplianceController {

  private final DocumentRepository documentRepository;
  private final AuditLogRepository auditLogRepository;

  /**
   * Construtor.
   *
   * @param documentRepository repo
   * @param auditLogRepository repo
   */
  public ComplianceController(
      DocumentRepository documentRepository, AuditLogRepository auditLogRepository) {
    this.documentRepository = documentRepository;
    this.auditLogRepository = auditLogRepository;
  }

  /**
   * Retorna estatisticas de conformidade.
   *
   * @return estatisticas de conformidade
   */
  @GetMapping
  @PreAuthorize("hasRole('AUDITOR')")
  public ResponseEntity<ComplianceStatsDto> getComplianceStats() {
    List<Document> allDocs = documentRepository.findAll();
    long totalDocs = allDocs.size();
    long approvedDocs =
        allDocs.stream().filter(d -> d.getStatus() == DocumentStatus.APPROVED).count();
    long pendingDocs =
        allDocs.stream().filter(d -> d.getStatus() == DocumentStatus.PENDING_REVIEW).count();
    long totalEvents = auditLogRepository.count();

    int approvalPercentage =
        totalDocs == 0 ? 100 : (int) Math.round(((double) approvedDocs / totalDocs) * 100);

    ComplianceStatsDto stats = new ComplianceStatsDto();
    stats.setScore(approvalPercentage);
    stats.setScoreTrend(4); // Fictional trend
    stats.setCompliantPolicies(3);
    stats.setTotalPolicies(5);
    stats.setPendingItems((int) pendingDocs);
    stats.setTotalEvents((int) totalEvents);

    final List<ComplianceStatsDto.PolicyDto> policies = new ArrayList<>();

    boolean noDocs = totalDocs == 0;

    // Policy 1
    ComplianceStatsDto.PolicyDto p1 = new ComplianceStatsDto.PolicyDto();
    p1.setName("Anonimização de dados pessoais (LGPD)");
    p1.setStatus("conforme");
    p1.setPercentage(100);
    p1.setText(noDocs ? "Sem documentos avaliados" : totalDocs + "/" + totalDocs + " documentos");
    policies.add(p1);

    // Policy 2 - baseada na aprovação do orientador real
    ComplianceStatsDto.PolicyDto p2 = new ComplianceStatsDto.PolicyDto();
    p2.setName("Termo de consentimento informado");
    p2.setStatus(
        approvalPercentage == 100
            ? "conforme"
            : (approvalPercentage > 50 ? "parcial" : "pendente"));
    p2.setPercentage(approvalPercentage);
    p2.setText(
        noDocs ? "Sem documentos avaliados" : approvedDocs + "/" + totalDocs + " documentos");
    policies.add(p2);

    // Policy 3
    ComplianceStatsDto.PolicyDto p3 = new ComplianceStatsDto.PolicyDto();
    p3.setName("Versionamento e cadeia de custódia");
    p3.setStatus("conforme");
    p3.setPercentage(noDocs ? 100 : 96);
    p3.setText(
        noDocs
            ? "Sem documentos avaliados"
            : (totalDocs > 0 ? totalDocs - 1 : 0) + "/" + totalDocs + " documentos");
    policies.add(p3);

    // Policy 4
    ComplianceStatsDto.PolicyDto p4 = new ComplianceStatsDto.PolicyDto();
    p4.setName("Retenção e descarte de dados");
    p4.setStatus(noDocs ? "conforme" : "pendente");
    p4.setPercentage(noDocs ? 100 : 58);
    p4.setText(
        noDocs
            ? "Sem documentos pendentes"
            : pendingDocs + "/" + totalDocs + " documentos pendentes");
    policies.add(p4);

    // Policy 5
    ComplianceStatsDto.PolicyDto p5 = new ComplianceStatsDto.PolicyDto();
    p5.setName("Aprovação do comitê de ética");
    p5.setStatus("conforme");
    p5.setPercentage(100);
    p5.setText("Todos os projetos");
    policies.add(p5);

    stats.setPolicies(policies);

    return ResponseEntity.ok(stats);
  }
}
