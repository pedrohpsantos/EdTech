package com.edtech.dto;

/** Documentação para AddProjectMemberDto. */
public class AddProjectMemberDto {
  private String email;
  private String role;

  /** Documentação para o método getEmail. */
  public String getEmail() {
    return email;
  }

  /** Documentação para o método setEmail. */
  public void setEmail(String email) {
    this.email = email;
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
