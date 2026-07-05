package com.edtech.controller;

import com.edtech.model.DocumentStatus;
import com.edtech.model.User;
import com.edtech.repository.DocumentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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
        User mockUser = new User("Test", "test@test.com", "hash", com.edtech.model.UserRole.RESEARCHER);
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
        when(documentRepository.countDocumentsByUserIdAndStatus(mockUser.getId(), DocumentStatus.PENDING_REVIEW)).thenReturn(2L);

        ResponseEntity<Map<String, Object>> response = dashboardController.getStats(auth);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        Map<String, Object> body = response.getBody();
        assertNotNull(body);
        assertEquals(10L, body.get("activeDocuments"));
        assertEquals(2L, body.get("pendingReview"));
        assertEquals(92, body.get("complianceScore"));
        assertEquals(68, body.get("researchProgress"));
    }
}
