package com.edtech.dto;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Payload de resposta para a listagem paginada de logs de auditoria. Usado no endpoint {@code GET
 * /api/audit-logs}.
 */
public record AuditLogResponseDto(
    UUID id,
    UUID userId,
    String userName,
    String action,
    String resourceType,
    UUID resourceId,
    String ipAddress,
    String details,
    LocalDateTime createdAt) {}
