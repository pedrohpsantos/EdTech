package com.edtech.dto;

import com.edtech.model.DocumentStatus;
import java.time.ZonedDateTime;
import java.util.UUID;

/** Documentação para DocumentResponseDto. */
public class DocumentResponseDto {
  private UUID id;
  private String title;
  private String fileUrl;
  private DocumentStatus status;
  private UUID authorId;
  private UUID projectId;
  private ZonedDateTime createdAt;
  private String feedback;
  private boolean starred;

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

  /** Documentação para o método getAuthorId. */
  public UUID getAuthorId() {
    return authorId;
  }

  /** Documentação para o método setAuthorId. */
  public void setAuthorId(UUID authorId) {
    this.authorId = authorId;
  }

  /** Documentação para o método getProjectId. */
  public UUID getProjectId() {
    return projectId;
  }

  /** Documentação para o método setProjectId. */
  public void setProjectId(UUID projectId) {
    this.projectId = projectId;
  }

  /** Documentação para o método getCreatedAt. */
  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  /** Documentação para o método setCreatedAt. */
  public void setCreatedAt(ZonedDateTime createdAt) {
    this.createdAt = createdAt;
  }

  /** Documentação para o método getFeedback. */
  public String getFeedback() {
    return feedback;
  }

  /** Documentação para o método setFeedback. */
  public void setFeedback(String feedback) {
    this.feedback = feedback;
  }

  public boolean isStarred() {
    return starred;
  }

  public void setStarred(boolean starred) {
    this.starred = starred;
  }
}
