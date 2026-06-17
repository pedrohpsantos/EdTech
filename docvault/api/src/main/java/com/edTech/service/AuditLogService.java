package com.edTech.service;

import java.util.UUID;
import com.edTech.model.AuditLog;
import com.edTech.model.AcaoAuditoria;
import com.edTech.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

@Service
public class AuditLogService{
    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public AuditLog log(AcaoAuditoria action, UUID userId, String resourceType, UUID resourceId, String ip, String details){
        try {
            AuditLog auditLog = new AuditLog(userId, action, resourceType, resourceId, ip, details);
            return auditLogRepository.save(auditLog);
        }
        catch (Exception e) {
            System.err.println("Erro em salvar o log da auditoria: " + e.getMessage());
            return null;
        }
    }

    public AuditLog logAction(UUID userId, AcaoAuditoria action, String details) {
        return log(action, userId, null, null, null, details);
    }
}
