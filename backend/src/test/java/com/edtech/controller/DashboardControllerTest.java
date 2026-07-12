package com.edtech.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.edtech.model.DocumentStatus;
import com.edtech.model.User;
import com.edtech.repository.DocumentRepository;
import java.util.Map;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

class DashboardControllerTest {

  private DocumentRepository documentRepository;
  private DashboardController dashboardController;

  @BeforeEach
  void setUp() {
    documentRepository = mock(DocumentRepository.class);
    dashboardController = new DashboardController(documentRepository);
  }

  @Test
  void testGetStats() {
    Authentication auth = mock(Authentication.class);
    User mockUser =
        new User(
            "Test",
            "test@unb.br",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    UUID userId = UUID.randomUUID();
    try {
      java.lang.reflect.Field idField = User.class.getDeclaredField("id");
      idField.setAccessible(true);
      idField.set(mockUser, userId);
    } catch (Exception e) {
      // Ignore
    }

    when(auth.getPrincipal()).thenReturn(mockUser);

    when(documentRepository.countDocumentsByUserId(mockUser.getId())).thenReturn(10L);
    when(documentRepository.countDocumentsByUserIdAndStatus(
            mockUser.getId(), DocumentStatus.PENDING_REVIEW))
        .thenReturn(2L);
    when(documentRepository.countDocumentsByUserIdAndStatus(mockUser.getId(), DocumentStatus.APPROVED))
        .thenReturn(6L);
    when(documentRepository.countDocumentsByUserIdAndStatus(mockUser.getId(), DocumentStatus.PUBLISHED))
        .thenReturn(1L);

    ResponseEntity<Map<String, Object>> response = dashboardController.getStats(auth);

    assertNotNull(response);
    assertEquals(200, response.getStatusCode().value());
    Map<String, Object> body = response.getBody();
    assertNotNull(body);
    assertEquals(10L, body.get("activeDocuments"));
    assertEquals(2L, body.get("pendingReview"));
    assertEquals(60, body.get("complianceScore"));
    assertEquals(70, body.get("researchProgress"));
  }
}
