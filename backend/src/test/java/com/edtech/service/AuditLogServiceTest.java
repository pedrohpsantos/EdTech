package com.edtech.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.edtech.model.AuditAction;
import com.edtech.model.AuditLog;
import com.edtech.repository.AuditLogRepository;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@ExtendWith(MockitoExtension.class)
public class AuditLogServiceTest {

  @Mock
  private AuditLogRepository auditLogRepository;

  @Captor
  private ArgumentCaptor<AuditLog> logCaptor;

  @InjectMocks
  private AuditLogService auditLogService;

  @BeforeEach
  void setUp() {
    RequestContextHolder.resetRequestAttributes();
  }

  @Test
  void testLog_WithExplicitIp() {
    UUID userId = UUID.randomUUID();
    UUID resourceId = UUID.randomUUID();
    when(auditLogRepository.save(any(AuditLog.class))).thenAnswer(i -> i.getArguments()[0]);

    AuditLog result = auditLogService.log(
        AuditAction.LOGIN_SUCCESS, userId, "User", resourceId, "192.168.1.1", "Test log");

    verify(auditLogRepository).save(logCaptor.capture());
    AuditLog captured = logCaptor.getValue();

    assertEquals(userId, captured.getUserId());
    assertEquals(AuditAction.LOGIN_SUCCESS, captured.getAction());
    assertEquals("User", captured.getResourceType());
    assertEquals(resourceId, captured.getResourceId());
    assertEquals("192.168.1.1", captured.getIpAddress());
    assertEquals("Test log", captured.getDetails());

    assertNotNull(result);
    assertEquals("192.168.1.1", result.getIpAddress());
  }

  @Test
  void testLog_WithRequestContextIp() {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.setRemoteAddr("10.0.0.1");
    RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

    UUID userId = UUID.randomUUID();
    when(auditLogRepository.save(any(AuditLog.class))).thenAnswer(i -> i.getArguments()[0]);

    AuditLog result = auditLogService.logAction(userId, AuditAction.UPLOAD_SUCCESS, "Test log");

    verify(auditLogRepository).save(logCaptor.capture());
    AuditLog captured = logCaptor.getValue();
    assertEquals("10.0.0.1", captured.getIpAddress());

    assertNotNull(result);
    assertEquals("10.0.0.1", result.getIpAddress());
  }

  @Test
  void testLog_WithXForwardedFor() {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.addHeader("X-Forwarded-For", "203.0.113.195, 198.51.100.1");
    RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

    UUID userId = UUID.randomUUID();
    when(auditLogRepository.save(any(AuditLog.class))).thenAnswer(i -> i.getArguments()[0]);

    AuditLog result = auditLogService.logAction(userId, AuditAction.DELETE_DOCUMENT, "Test log");

    verify(auditLogRepository).save(logCaptor.capture());
    AuditLog captured = logCaptor.getValue();
    assertEquals("203.0.113.195", captured.getIpAddress());

    assertNotNull(result);
  }

  @Test
  void testLog_WithoutContextFallbackToUnknown() {
    UUID userId = UUID.randomUUID();
    when(auditLogRepository.save(any(AuditLog.class))).thenAnswer(i -> i.getArguments()[0]);

    AuditLog result = auditLogService.logAction(userId, AuditAction.DELETE_DOCUMENT, "Test log");

    verify(auditLogRepository).save(logCaptor.capture());
    AuditLog captured = logCaptor.getValue();
    assertEquals("UNKNOWN", captured.getIpAddress());

    assertNotNull(result);
  }

  @Test
  void testLog_ExceptionHandling() {
    when(auditLogRepository.save(any(AuditLog.class)))
        .thenThrow(new RuntimeException("Database error"));

    AuditLog result = auditLogService.logAction(UUID.randomUUID(), AuditAction.LOGIN_FAILED, "Test error");

    assertNull(result);
  }
}
