package com.edTech.service;

import com.edTech.model.AcaoAuditoria;
import com.edTech.model.AuditLog;
import com.edTech.repository.AuditLogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuditLogServiceTest {

    @Mock
    private AuditLogRepository auditLogRepository;

    @InjectMocks
    private AuditLogService auditLogService;

    @BeforeEach
    void setUp() {
        RequestContextHolder.resetRequestAttributes();
    }

    @Test
    void testLog_WithExplicitIp() {
        UUID userId = UUID.randomUUID();
        AuditLog mockLog = new AuditLog(userId, AcaoAuditoria.LOGIN_SUCCESS, null, null, "192.168.1.1", "Test log");

        when(auditLogRepository.save(any(AuditLog.class))).thenReturn(mockLog);

        AuditLog result = auditLogService.log(AcaoAuditoria.LOGIN_SUCCESS, userId, null, null, "192.168.1.1", "Test log");

        assertNotNull(result);
        assertEquals("192.168.1.1", result.getIpAddress());
        verify(auditLogRepository, times(1)).save(any(AuditLog.class));
    }

    @Test
    void testLog_WithRequestContextIp() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setRemoteAddr("10.0.0.1");
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        UUID userId = UUID.randomUUID();
        AuditLog mockLog = new AuditLog(userId, AcaoAuditoria.UPLOAD_SUCCESS, null, null, "10.0.0.1", "Test log");
        when(auditLogRepository.save(any(AuditLog.class))).thenReturn(mockLog);

        AuditLog result = auditLogService.logAction(userId, AcaoAuditoria.UPLOAD_SUCCESS, "Test log");

        assertNotNull(result);
        assertEquals("10.0.0.1", result.getIpAddress());
        verify(auditLogRepository, times(1)).save(any(AuditLog.class));
    }

    @Test
    void testLog_WithXForwardedFor() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("X-Forwarded-For", "203.0.113.195, 198.51.100.1");
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        UUID userId = UUID.randomUUID();
        AuditLog mockLog = new AuditLog(userId, AcaoAuditoria.DELETE_DOCUMENT, null, null, "203.0.113.195", "Test log");
        when(auditLogRepository.save(any(AuditLog.class))).thenReturn(mockLog);

        AuditLog result = auditLogService.logAction(userId, AcaoAuditoria.DELETE_DOCUMENT, "Test log");

        assertNotNull(result);
        assertEquals("203.0.113.195", result.getIpAddress());
    }

    @Test
    void testLog_ExceptionHandling() {
        when(auditLogRepository.save(any(AuditLog.class))).thenThrow(new RuntimeException("Database error"));

        AuditLog result = auditLogService.logAction(UUID.randomUUID(), AcaoAuditoria.LOGIN_FAILED, "Test error");

        assertNull(result); // Must return null when there is an exception
    }
}
