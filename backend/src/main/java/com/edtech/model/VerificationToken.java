package com.edtech.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/** Javadoc. */
@Entity
@Table(name = "verification_tokens")
public class VerificationToken {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String token;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private LocalDateTime expiresAt;

  protected VerificationToken() {
  }

  /** Javadoc. */
  public VerificationToken(String token, String email, LocalDateTime expiresAt) {
    this.token = token;
    this.email = email;
    this.expiresAt = expiresAt;
  }

  public Long getId() {
    return id;
  }

  public String getToken() {
    return token;
  }

  public String getEmail() {
    return email;
  }

  public LocalDateTime getExpiresAt() {
    return expiresAt;
  }

  public boolean isExpired() {
    return LocalDateTime.now().isAfter(expiresAt);
  }
}
