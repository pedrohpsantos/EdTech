package com.edtech.service;

import com.edtech.model.AcaoAuditoria;
import com.edtech.model.AuditLog;
import com.edtech.repository.AuditLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/** Serviço responsável por registrar logs de auditoria no sistema. */
@Service
public class AuditLogService {
  private static final Logger log = LoggerFactory.getLogger(AuditLogService.class);
  private final AuditLogRepository auditLogRepository;

  /**
   * Construtor para injeção de dependências.
   *
   * @param auditLogRepository Repositório de logs de auditoria.
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
   * Registra uma ação de auditoria detalhada.
   *
   * @param action Ação realizada.
   * @param userId ID do usuário.
   * @param resourceType Tipo do recurso.
   * @param resourceId ID do recurso.
   * @param ip IP do cliente.
   * @param details Detalhes adicionais.
   * @return Log de auditoria salvo.
   */
  public AuditLog log(
      AcaoAuditoria action,
      UUID userId,
      String resourceType,
      UUID resourceId,
      String ip,
      String details) {
    try {
      String clientIp = ip != null ? ip : getClientIp();
      AuditLog auditLog = new AuditLog(userId, action, resourceType, resourceId, clientIp, details);
      return auditLogRepository.save(auditLog);
    } catch (Exception e) {
      log.error("Erro em salvar o log da auditoria: {}", e.getMessage(), e);
      return null;
    }
  }

  /**
   * Registra uma ação de auditoria simples.
   *
   * @param userId ID do usuário.
   * @param action Ação realizada.
   * @param details Detalhes adicionais.
   * @return Log de auditoria salvo.
   */
  public AuditLog logAction(UUID userId, AcaoAuditoria action, String details) {
    return log(action, userId, null, null, null, details);
  }
}
