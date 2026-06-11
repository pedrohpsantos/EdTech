package com.edTech.model;

import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true, nullable = false)
    public UUID id;

    public UUID userId;

    public AcaoAuditoria action;

    public String resourceType;

    public UUID resourceId;

    public String ipAddress;

    public String details;

    public LocalDateTime createdAt;

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
