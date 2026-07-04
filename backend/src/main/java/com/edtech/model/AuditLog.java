package com.edtech.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;

/** Documentação para AuditLog. */
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

  /** Documentação para o método getId. */
  public UUID getId() {
    return id;
  }

  /** Documentação para o método getUserId. */
  public UUID getUserId() {
    return userId;
  }

  /** Documentação para o método setUserId. */
  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  /** Documentação para o método getAction. */
  public AcaoAuditoria getAction() {
    return action;
  }

  /** Documentação para o método setAction. */
  public void setAction(AcaoAuditoria action) {
    this.action = action;
  }

  /** Documentação para o método getResourceType. */
  public String getResourceType() {
    return resourceType;
  }

  /** Documentação para o método setResourceType. */
  public void setResourceType(String resourceType) {
    this.resourceType = resourceType;
  }

  /** Documentação para o método getResourceId. */
  public UUID getResourceId() {
    return resourceId;
  }

  /** Documentação para o método setResourceId. */
  public void setResourceId(UUID resourceId) {
    this.resourceId = resourceId;
  }

  /** Documentação para o método getIpAddress. */
  public String getIpAddress() {
    return ipAddress;
  }

  /** Documentação para o método setIpAddress. */
  public void setIpAddress(String ipAddress) {
    this.ipAddress = ipAddress;
  }

  /** Documentação para o método getDetails. */
  public String getDetails() {
    return details;
  }

  /** Documentação para o método setDetails. */
  public void setDetails(String details) {
    this.details = details;
  }

  /** Documentação para o método getCreatedAt. */
  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  /** Documentação para o método AuditLog. */
  public AuditLog() {}

  /** Documentação. */
  public AuditLog(
      UUID userId,
      AcaoAuditoria action,
      String resourceType,
      UUID resourceId,
      String ipAddress,
      String details) {
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
