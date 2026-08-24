package com.edtech.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/** Documentação para RecoveryToken. */
@Entity
@Table(name = "recovery_tokens")
public class RecoveryToken {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String token;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private LocalDateTime expiryDate;

  /** Documentação para o método RecoveryToken. */
  public RecoveryToken() {
  }

  /** Documentação para o método RecoveryToken. */
  public RecoveryToken(String token, String email, LocalDateTime expiryDate) {
    this.token = token;
    this.email = email;
    this.expiryDate = expiryDate;
  }

  /** Documentação para o método getId. */
  public Long getId() {
    return id;
  }

  /** Documentação para o método setId. */
  public void setId(Long id) {
    this.id = id;
  }

  /** Documentação para o método getToken. */
  public String getToken() {
    return token;
  }

  /** Documentação para o método setToken. */
  public void setToken(String token) {
    this.token = token;
  }

  /** Documentação para o método getEmail. */
  public String getEmail() {
    return email;
  }

  /** Documentação para o método setEmail. */
  public void setEmail(String email) {
    this.email = email;
  }

  /** Documentação para o método getExpiryDate. */
  public LocalDateTime getExpiryDate() {
    return expiryDate;
  }

  /** Documentação para o método setExpiryDate. */
  public void setExpiryDate(LocalDateTime expiryDate) {
    this.expiryDate = expiryDate;
  }

  /** Documentação para o método isExpired. */
  public boolean isExpired() {
    return LocalDateTime.now().isAfter(this.expiryDate);
  }
}
