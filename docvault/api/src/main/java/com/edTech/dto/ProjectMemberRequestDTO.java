package com.edTech.dto;

import java.util.UUID;

public class ProjectMemberRequestDTO {
  private UUID userId;
  private String role; // defaults to RESEARCHER

  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
