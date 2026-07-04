package com.edtech.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.UUID;

/** Documentação para Project. */
@Entity
@Table(name = "projects")
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false, length = 120)
  private String title;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String description;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "advisor_id")
  private User advisor;

  @Column(name = "created_at", nullable = false, updatable = false)
  private ZonedDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private ZonedDateTime updatedAt;

  @PrePersist
  protected void onCreate() {
    this.createdAt = ZonedDateTime.now();
    this.updatedAt = ZonedDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = ZonedDateTime.now();
  }

  // Getters and Setters
  /** Documentação para o método getId. */
  public UUID getId() {
    return id;
  }

  /** Documentação para o método setId. */
  public void setId(UUID id) {
    this.id = id;
  }

  /** Documentação para o método getTitle. */
  public String getTitle() {
    return title;
  }

  /** Documentação para o método setTitle. */
  public void setTitle(String title) {
    this.title = title;
  }

  /** Documentação para o método getDescription. */
  public String getDescription() {
    return description;
  }

  /** Documentação para o método setDescription. */
  public void setDescription(String description) {
    this.description = description;
  }

  /** Documentação para o método getAdvisor. */
  public User getAdvisor() {
    return advisor;
  }

  /** Documentação para o método setAdvisor. */
  public void setAdvisor(User advisor) {
    this.advisor = advisor;
  }

  /** Documentação para o método getCreatedAt. */
  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  /** Documentação para o método setCreatedAt. */
  public void setCreatedAt(ZonedDateTime createdAt) {
    this.createdAt = createdAt;
  }

  /** Documentação para o método getUpdatedAt. */
  public ZonedDateTime getUpdatedAt() {
    return updatedAt;
  }

  /** Documentação para o método setUpdatedAt. */
  public void setUpdatedAt(ZonedDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}
