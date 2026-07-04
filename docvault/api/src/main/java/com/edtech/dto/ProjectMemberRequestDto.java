package com.edtech.dto;

import java.util.UUID;

/** Documentação para ProjectMemberRequestDto. */
public class ProjectMemberRequestDto {
  private UUID userId;
  private String role; // defaults to RESEARCHER

  /** Documentação para o método getUserId. */
  public UUID getUserId() {
    return userId;
  }

  /** Documentação para o método setUserId. */
  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  /** Documentação para o método getRole. */
  public String getRole() {
    return role;
  }

  /** Documentação para o método setRole. */
  public void setRole(String role) {
    this.role = role;
  }
}
