package com.edtech.service;

import com.edtech.model.AuditAction;
import com.edtech.model.AuditLog;
import com.edtech.repository.AuditLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/** Servico responsavel por registrar logs de auditoria no sistema. */
@Service
public class AuditLogService {
  private static final String DOCUMENT_RESOURCE_TYPE = "Document";
  private static final Logger log = LoggerFactory.getLogger(AuditLogService.class);
  private final AuditLogRepository auditLogRepository;

  /**
   * Construtor para injecao de dependencias.
   *
   * @param auditLogRepository Repositorio de logs de auditoria.
   */
  public AuditLogService(AuditLogRepository auditLogRepository) {
    this.auditLogRepository = auditLogRepository;
  }

  private String getClientIp() {
    try {
      ServletRequestAttributes attributes =
          (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
      if (attributes != null) {
        HttpServletRequest request = attributes.getRequest();
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isEmpty()) {
          return forwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
      }
    } catch (Exception ignored) {
      log.debug("Erro ao extrair o IP do cliente", ignored);
    }
    return "UNKNOWN";
  }

  /**
   * Registra uma acao de auditoria detalhada.
   *
   * @param action Acao realizada.
   * @param userId ID do usuario.
   * @param resourceType Tipo do recurso.
   * @param resourceId ID do recurso.
   * @param ip IP do cliente.
   * @param details Detalhes adicionais.
   * @return Log de auditoria salvo.
   */
  public AuditLog log(
      AuditAction action,
      UUID userId,
      String resourceType,
      UUID resourceId,
      String ip,
      String details) {
    UUID institutionId = resolveInstitutionId();
    return log(action, userId, resourceType, resourceId, ip, details, institutionId);
  }

  /** Javadoc. */
  public AuditLog log(
      AuditAction action,
      UUID userId,
      String resourceType,
      UUID resourceId,
      String ip,
      String details,
      UUID institutionId) {
    try {
      String clientIp = ip != null ? ip : getClientIp();
      AuditLog auditLog =
          new AuditLog(
              institutionId,
              userId,
              action,
              resourceType,
              resourceId,
              clientIp,
              details);
      return auditLogRepository.save(auditLog);
    } catch (Exception e) {
      log.error("Erro em salvar o log da auditoria: {}", e.getMessage(), e);
      return null;
    }
  }

  private UUID resolveInstitutionId() {
    try {
      org.springframework.security.core.Authentication auth =
          org.springframework.security.core.context.SecurityContextHolder.getContext()
              .getAuthentication();
      if (auth != null && auth.getPrincipal() instanceof com.edtech.model.User user) {
        return user.getInstitutionId();
      }
    } catch (Exception e) {
      log.debug("Could not resolve institutionId from security context", e);
    }
    return java.util.UUID.fromString("00000000-0000-0000-0000-000000000001");
  }

  /**
   * Registra uma acao de auditoria simples, sem vinculo direto com um recurso especifico.
   *
   * @param userId ID do usuario.
   * @param action Acao realizada.
   * @param details Detalhes adicionais.
   * @return Log de auditoria salvo.
   */
  public AuditLog logAction(UUID userId, AuditAction action, String details) {
    return log(action, userId, null, null, null, details);
  }

  /**
   * Registra uma acao de auditoria relacionada a um documento especifico.
   *
   * @param userId ID do usuario que executou a acao.
   * @param action Acao realizada.
   * @param documentId ID do documento afetado.
   * @param details Detalhes adicionais da acao.
   * @return Log de auditoria salvo.
   */
  public AuditLog logDocumentAction(
      UUID userId, AuditAction action, UUID documentId, String details) {
    return log(action, userId, DOCUMENT_RESOURCE_TYPE, documentId, null, details);
  }
}

