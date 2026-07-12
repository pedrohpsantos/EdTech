package com.edtech.controller;

import com.edtech.model.DocumentStatus;
import com.edtech.model.User;
import com.edtech.repository.DocumentRepository;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Documentação para DashboardController. */
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

  private final DocumentRepository documentRepository;

  /** Documentação para o método DashboardController. */
  public DashboardController(DocumentRepository documentRepository) {
    this.documentRepository = documentRepository;
  }

  /** Documentação. */
  @GetMapping("/stats")
  public ResponseEntity<Map<String, Object>> getStats(Authentication authentication) {
    User user = (User) authentication.getPrincipal();

    long totalDocs = documentRepository.countDocumentsByUserId(user.getId());
    long pendingReviewDocs =
        documentRepository.countDocumentsByUserIdAndStatus(
            user.getId(), DocumentStatus.PENDING_REVIEW);
    long approvedDocs =
        documentRepository.countDocumentsByUserIdAndStatus(user.getId(), DocumentStatus.APPROVED);
    long publishedDocs =
        documentRepository.countDocumentsByUserIdAndStatus(user.getId(), DocumentStatus.PUBLISHED);
    int complianceScore =
        totalDocs == 0 ? 100 : (int) Math.round((approvedDocs * 100.0) / totalDocs);
    int researchProgress =
        totalDocs == 0
            ? 0
            : (int) Math.round(((approvedDocs + publishedDocs) * 100.0) / totalDocs);

    Map<String, Object> stats = new HashMap<>();
    stats.put("activeDocuments", totalDocs);
    stats.put("pendingReview", pendingReviewDocs);
    stats.put("complianceScore", complianceScore);
    stats.put("researchProgress", Math.min(researchProgress, 100));

    return ResponseEntity.ok(stats);
  }
}
