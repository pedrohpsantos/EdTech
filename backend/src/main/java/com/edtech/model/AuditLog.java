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
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

/** Documentação para AuditLog. */
@Entity
@Table(name = "audit_logs")
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "institutionId", type = UUID.class))
@Filter(name = "tenantFilter", condition = "institution_id = :institutionId")
public class AuditLog {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(unique = true, nullable = false, updatable = false)
  private UUID id;

  @Column(name = "institution_id", nullable = false, updatable = false)
  private UUID institutionId;

  @Column(name = "user_id", nullable = false, updatable = false)
  private UUID userId;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, updatable = false)
  private AcaoAuditoria action;

  @Column(name = "resource_type", nullable = false, updatable = false)
  private String resourceType;

  @Column(name = "resource_id", nullable = false, updatable = false)
  private UUID resourceId;

  @Column(name = "ip_address", nullable = false, updatable = false)
  private String ipAddress;

  @Column(updatable = false)
  private String details;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  /** Documentação para o método getId. */
  public UUID getId() {
    return id;
  }

  /** Documentação para o método getUserId. */
  public UUID getUserId() {
    return userId;
  }

  /** Documentação para o método getAction. */
  public AcaoAuditoria getAction() {
    return action;
  }

  /** Documentação para o método getResourceType. */
  public String getResourceType() {
    return resourceType;
  }

  /** Documentação para o método getResourceId. */
  public UUID getResourceId() {
    return resourceId;
  }

  /** Documentação para o método getIpAddress. */
  public String getIpAddress() {
    return ipAddress;
  }

  /** Documentação para o método getDetails. */
  public String getDetails() {
    return details;
  }

  /** Documentação para o método getCreatedAt. */
  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  /** Documentação para o método AuditLog. */
  protected AuditLog() {}

  /** Documentação. */
  public AuditLog(
      UUID institutionId,
      UUID userId,
      AcaoAuditoria action,
      String resourceType,
      UUID resourceId,
      String ipAddress,
      String details) {
    this.institutionId = institutionId;
    this.userId = userId;
    this.action = action;
    this.resourceType = resourceType;
    this.resourceId = resourceId;
    this.ipAddress = ipAddress;
    this.details = details;
    onCreate();
  }

  private void onCreate() {
    this.createdAt = LocalDateTime.now();
  }
}
