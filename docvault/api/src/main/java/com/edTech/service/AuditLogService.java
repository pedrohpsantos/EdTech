package com.edTech.service;

import java.util.UUID;
import com.edTech.model.AuditLog;
import com.edTech.model.AcaoAuditoria;
import com.edTech.repository.AuditLogRepository;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuditLogService{
    private static final Logger log = LoggerFactory.getLogger(AuditLogService.class);
    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    private String getClientIp() {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                String xForwardedFor = request.getHeader("X-Forwarded-For");
                if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                    return xForwardedFor.split(",")[0].trim();
                }
                return request.getRemoteAddr();
            }
        } catch (Exception ignored) {
        }
        return "UNKNOWN";
    }

    public AuditLog log(AcaoAuditoria action, UUID userId, String resourceType, UUID resourceId, String ip, String details){
        try {
            String clientIp = ip != null ? ip : getClientIp();
            AuditLog auditLog = new AuditLog(userId, action, resourceType, resourceId, clientIp, details);
            return auditLogRepository.save(auditLog);
        }
        catch (Exception e) {
            log.error("Erro em salvar o log da auditoria: {}", e.getMessage(), e);
            return null;
        }
    }

    public AuditLog logAction(UUID userId, AcaoAuditoria action, String details) {
        return log(action, userId, null, null, null, details);
    }
}
