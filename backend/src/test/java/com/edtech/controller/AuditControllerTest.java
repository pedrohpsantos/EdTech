package com.edtech.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.edtech.dto.AuditLogDto;
import com.edtech.model.AuditAction;
import com.edtech.model.AuditLog;
import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

class AuditControllerTest {

  private AuditLogRepository auditLogRepository;
  private UserRepository userRepository;
  private AuditController auditController;

  @BeforeEach
  void setUp() {
    auditLogRepository = mock(AuditLogRepository.class);
    userRepository = mock(UserRepository.class);
    auditController = new AuditController(auditLogRepository, userRepository);
  }

  private AuditLog createMockLog(AuditAction action, String ip, String details) {
    AuditLog log =
        new AuditLog(
            UUID.randomUUID(), UUID.randomUUID(), action, "test", UUID.randomUUID(), ip, details);
    ReflectionTestUtils.setField(log, "id", UUID.randomUUID());
    ReflectionTestUtils.setField(log, "createdAt", LocalDateTime.now());
    return log;
  }

  @Test
  void getAuditLogs_WithoutFilters_ReturnsAllMappedLogs() {
    AuditLog log1 = createMockLog(AuditAction.LOGIN_SUCCESS, "192.168.0.1", "Login success");
    AuditLog log2 = createMockLog(AuditAction.LOGIN_FAILED, "192.168.1.2", "Login falhou");
    AuditLog log3 = createMockLog(AuditAction.DELETE_DOCUMENT, "192.168.1.3", "Doc excluido");
    AuditLog log4 = createMockLog(AuditAction.LOGOUT, "192.168.1.4", "Logout");

    User user1 =
        new User(
            "John Doe", "john@unb.br", "pass", UserRole.RESEARCHER, java.util.UUID.randomUUID());
    when(userRepository.findById(log1.getUserId())).thenReturn(Optional.of(user1));

    when(auditLogRepository.findAll(
            org.mockito.ArgumentMatchers.<Specification<AuditLog>>any(),
            org.mockito.ArgumentMatchers.<Pageable>any()))
        .thenReturn(new PageImpl<>(Arrays.asList(log1, log2, log3, log4)));

    ResponseEntity<Page<AuditLogDto>> response =
        auditController.getAuditLogs(null, null, null, null, PageRequest.of(0, 20));

    assertNotNull(response.getBody());
    assertEquals(4, response.getBody().getContent().size());

    AuditLogDto dto1 = response.getBody().getContent().get(0);
    assertEquals("green", dto1.getActionClass());
    assertEquals("INFO", dto1.getSeverity());
    assertEquals("John Doe", dto1.getUserName());
    assertNotNull(dto1.getId());
    assertNotNull(dto1.getTimestamp());

    AuditLogDto dto2 = response.getBody().getContent().get(1);
    assertEquals("orange", dto2.getActionClass());
    assertEquals("WARNING", dto2.getSeverity());
    assertEquals("Unknown", dto2.getUserName());

    AuditLogDto dto3 = response.getBody().getContent().get(2);
    assertEquals("red", dto3.getActionClass());
    assertEquals("CRITICAL", dto3.getSeverity());

    AuditLogDto dto4 = response.getBody().getContent().get(3);
    assertEquals("blue", dto4.getActionClass());
    assertEquals("INFO", dto4.getSeverity());
  }

  @Test
  void getAuditLogs_WithSearchFilter() {
    AuditLog log1 =
        createMockLog(
            AuditAction.LOGIN_SUCCESS, "192.168.1.1", "specific search term inside details");
    AuditLog log2 = createMockLog(AuditAction.LOGIN_FAILED, "192.168.1.2", "other details");

    when(auditLogRepository.findAll(
            org.mockito.ArgumentMatchers.<Specification<AuditLog>>any(),
            org.mockito.ArgumentMatchers.<Pageable>any()))
        .thenReturn(new PageImpl<>(Arrays.asList(log1, log2)));
    User user =
        new User(
            "John Doe", "john@unb.br", "pass", UserRole.RESEARCHER, java.util.UUID.randomUUID());
    when(userRepository.findById(log1.getUserId())).thenReturn(Optional.of(user));
    when(userRepository.findById(log2.getUserId())).thenReturn(Optional.of(user));

    ResponseEntity<Page<AuditLogDto>> response =
        auditController.getAuditLogs("specific search", null, null, null, PageRequest.of(0, 20));

    assertNotNull(response.getBody());
    assertEquals(2, response.getBody().getContent().size());
    assertEquals("specific search term inside details", response.getBody().getContent().get(0).getDetails());
  }

  @Test
  void getAuditLogs_WithActionFilter() {
    AuditLog log1 = createMockLog(AuditAction.LOGIN_SUCCESS, "192.168.1.1", "details");
    AuditLog log2 = createMockLog(AuditAction.LOGIN_FAILED, "192.168.1.2", "details");

    when(auditLogRepository.findAll(
            org.mockito.ArgumentMatchers.<Specification<AuditLog>>any(),
            org.mockito.ArgumentMatchers.<Pageable>any()))
        .thenReturn(new PageImpl<>(Arrays.asList(log1, log2)));
    User user =
        new User(
            "John Doe", "john@unb.br", "pass", UserRole.RESEARCHER, java.util.UUID.randomUUID());
    when(userRepository.findById(log1.getUserId())).thenReturn(Optional.of(user));
    when(userRepository.findById(log2.getUserId())).thenReturn(Optional.of(user));

    ResponseEntity<Page<AuditLogDto>> response =
        auditController.getAuditLogs(null, "LOGIN_FAILED", null, null, PageRequest.of(0, 20));

    assertNotNull(response.getBody());
    assertEquals(2, response.getBody().getContent().size());
    assertEquals("LOGIN_FAILED", response.getBody().getContent().get(1).getAction());
  }

  @Test
  void exportAuditLogs_ReturnsCsv() {
    AuditLog log1 =
        createMockLog(AuditAction.LOGIN_SUCCESS, "192.168.1.1", "details\nwith newline");
    when(auditLogRepository.findAll(
            org.mockito.ArgumentMatchers.<Specification<AuditLog>>any(),
            org.mockito.ArgumentMatchers.<Pageable>any()))
        .thenReturn(new PageImpl<>(Arrays.asList(log1)));
    User user =
        new User(
            "John Doe", "john@unb.br", "pass", UserRole.RESEARCHER, java.util.UUID.randomUUID());
    when(userRepository.findById(log1.getUserId())).thenReturn(Optional.of(user));

    ResponseEntity<String> response = auditController.exportAuditLogs(null, null, null, null);

    assertEquals(200, response.getStatusCode().value());
    assertNotNull(response.getBody());
    org.junit.jupiter.api.Assertions.assertNotNull(
        response.getHeaders().get("Content-Disposition"));
    org.junit.jupiter.api.Assertions.assertNotNull(response.getHeaders().get("Content-Type"));
    org.junit.jupiter.api.Assertions.assertTrue(
        response.getBody().contains("ID,Timestamp,Action,User,IP,Details,Severity\n"));
    org.junit.jupiter.api.Assertions.assertTrue(
        response.getBody().contains("\"details\nwith newline\""));
    org.junit.jupiter.api.Assertions.assertEquals(
        "\"details\nwith newline\"",
        ReflectionTestUtils.invokeMethod(auditController, "escapeCsv", "details\nwith newline"));
    org.junit.jupiter.api.Assertions.assertEquals(
        "\"a,b\"", ReflectionTestUtils.invokeMethod(auditController, "escapeCsv", "a,b"));
    org.junit.jupiter.api.Assertions.assertEquals(
        "\"a\"\"b\"", ReflectionTestUtils.invokeMethod(auditController, "escapeCsv", "a\"b"));
    org.junit.jupiter.api.Assertions.assertEquals(
        "normal", ReflectionTestUtils.invokeMethod(auditController, "escapeCsv", "normal"));
  }
}
