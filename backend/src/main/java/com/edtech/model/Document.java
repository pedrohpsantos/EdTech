package com.edtech.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

/** Documentação para Document. */
@Entity
@Table(name = "documents")
public class Document {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false, length = 120)
  private String title;

  @Column(name = "file_url", nullable = false, columnDefinition = "TEXT")
  private String fileUrl;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private DocumentStatus status = DocumentStatus.DRAFT;

  @Column(columnDefinition = "TEXT")
  private String feedback;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id", nullable = false)
  private User author;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "project_id", nullable = false)
  private Project project;

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

  /** Documentação para o método getFileUrl. */
  public String getFileUrl() {
    return fileUrl;
  }

  /** Documentação para o método setFileUrl. */
  public void setFileUrl(String fileUrl) {
    this.fileUrl = fileUrl;
  }

  /** Documentação para o método getStatus. */
  public DocumentStatus getStatus() {
    return status;
  }

  /** Documentação para o método setStatus. */
  public void setStatus(DocumentStatus status) {
    this.status = status;
  }

  /** Documentação para o método getFeedback. */
  public String getFeedback() {
    return feedback;
  }

  /** Documentação para o método setFeedback. */
  public void setFeedback(String feedback) {
    this.feedback = feedback;
  }

  /** Documentação para o método getAuthor. */
  public User getAuthor() {
    return author;
  }

  /** Documentação para o método setAuthor. */
  public void setAuthor(User author) {
    this.author = author;
  }

  /** Documentação para o método getProject. */
  public Project getProject() {
    return project;
  }

  /** Documentação para o método setProject. */
  public void setProject(Project project) {
    this.project = project;
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
