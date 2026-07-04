package com.edtech.dto;

import java.time.ZonedDateTime;
import java.util.UUID;

/** Documentação para ProjectResponseDto. */
public class ProjectResponseDto {
  private UUID id;
  private String title;
  private String description;
  private UUID advisorId;
  private ZonedDateTime createdAt;

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

  /** Documentação para o método getAdvisorId. */
  public UUID getAdvisorId() {
    return advisorId;
  }

  /** Documentação para o método setAdvisorId. */
  public void setAdvisorId(UUID advisorId) {
    this.advisorId = advisorId;
  }

  /** Documentação para o método getCreatedAt. */
  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  /** Documentação para o método setCreatedAt. */
  public void setCreatedAt(ZonedDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
