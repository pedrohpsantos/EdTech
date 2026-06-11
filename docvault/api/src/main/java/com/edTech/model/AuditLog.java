package com.edTech.model;

import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true, nullable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AcaoAuditoria action;

    @Column(name = "resource_type", nullable = false)
    private String resourceType;

    @Column(name = "resource_id", nullable = false)
    private UUID resourceId;

    @Column(name = "ip_address", nullable = false)
    private String ipAddress;

    private String details;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public UUID getId() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public AcaoAuditoria getAction() {
        return action;
    }

    public void setAction(AcaoAuditoria action) {
        this.action = action;
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public UUID getResourceId() {
        return resourceId;
    }

    public void setResourceId(UUID resourceId) {
        this.resourceId = resourceId;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public AuditLog() {}

    public AuditLog(UUID userId, AcaoAuditoria action, String resourceType, UUID resourceId, String ipAddress, String details) {
        setUserId(userId);
        setAction(action);
        setResourceType(resourceType);
        setResourceId(resourceId);
        setIpAddress(ipAddress);
        setDetails(details);
        onCreate();
    }

    private void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
