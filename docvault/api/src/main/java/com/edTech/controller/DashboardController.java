package com.edTech.controller;

import com.edTech.model.User;
import com.edTech.repository.DocumentRepository;
import com.edTech.model.DocumentStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DocumentRepository documentRepository;

    public DashboardController(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        
        long totalDocs = documentRepository.countDocumentsByUserId(user.getId());
        long pendingReviewDocs = documentRepository.countDocumentsByUserIdAndStatus(user.getId(), DocumentStatus.PENDING_REVIEW);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("activeDocuments", totalDocs);
        stats.put("pendingReview", pendingReviewDocs);
        stats.put("complianceScore", 92); // TODO: Implementar lógica de conformidade real
        stats.put("researchProgress", 68); // TODO: Implementar lógica de progresso real
        
        return ResponseEntity.ok(stats);
    }
}
