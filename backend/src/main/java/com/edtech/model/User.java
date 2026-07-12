package com.edtech.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

/** Documentação para User. */
@Entity
@Table(name = "users")
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "institutionId", type = UUID.class))
@Filter(name = "tenantFilter", condition = "institution_id = :institutionId")
@SQLDelete(sql = "UPDATE users SET deleted = true WHERE id=?")
@SQLRestriction("deleted = false")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(updatable = false, nullable = false)
  private UUID id;

  @Column(name = "institution_id", nullable = false)
  private UUID institutionId;

  @Column(nullable = false, length = 120)
  private String name;

  @Column(nullable = false, unique = true, length = 180)
  private String email;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private UserRole role = UserRole.RESEARCHER;

  @Column(nullable = false)
  private boolean active = true;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  @Column(nullable = false)
  private boolean deleted = false;

  @Column(name = "mfa_enabled", nullable = false)
  private boolean mfaEnabled = false;

  @Column(name = "mfa_secret", length = 32)
  private String mfaSecret;

  protected User() {}

  /** Documentação para o método User. */
  public User(String name, String email, String passwordHash, UserRole role, UUID institutionId) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.institutionId = institutionId;
  }

  @PrePersist
  void prePersist() {
    Instant now = Instant.now();
    createdAt = now;
    updatedAt = now;
  }

  @PreUpdate
  void preUpdate() {
    updatedAt = Instant.now();
  }

  /** Documentação para o método getId. */
  public UUID getId() {
    return id;
  }

  /** Documentação para o método getInstitutionId. */
  public UUID getInstitutionId() {
    return institutionId;
  }

  /** Documentação para o método setInstitutionId. */
  public void setInstitutionId(UUID institutionId) {
    this.institutionId = institutionId;
  }

  /** Documentação para o método getName. */
  public String getName() {
    return name;
  }

  /** Documentação para o método getEmail. */
  public String getEmail() {
    return email;
  }

  /** Documentação para o método getPasswordHash. */
  public String getPasswordHash() {
    return passwordHash;
  }

  /** Documentação para o método setPasswordHash. */
  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
  }

  /** Documentação para o método getRole. */
  public UserRole getRole() {
    return role;
  }

  /** Documentação para o método setRole. */
  public void setRole(UserRole role) {
    this.role = role;
  }

  /** Documentação para o método isActive. */
  public boolean isActive() {
    return active;
  }

  /** Documentação para o método setActive. */
  public void setActive(boolean active) {
    this.active = active;
  }

  /** Documentação para o método getCreatedAt. */
  public Instant getCreatedAt() {
    return createdAt;
  }

  /** Documentação para o método getUpdatedAt. */
  public Instant getUpdatedAt() {
    return updatedAt;
  }

  public boolean isDeleted() {
    return deleted;
  }

  public void setDeleted(boolean deleted) {
    this.deleted = deleted;
  }

  public boolean isMfaEnabled() {
    return mfaEnabled;
  }

  public void setMfaEnabled(boolean mfaEnabled) {
    this.mfaEnabled = mfaEnabled;
  }

  public String getMfaSecret() {
    return mfaSecret;
  }

  public void setMfaSecret(String mfaSecret) {
    this.mfaSecret = mfaSecret;
  }
}
