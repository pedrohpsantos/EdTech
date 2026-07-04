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
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.UUID;

/** Documentação para ProjectMember. */
@Entity
@Table(name = "project_members")
public class ProjectMember {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "project_id", nullable = false)
  private Project project;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ProjectRole role;

  @Column(name = "joined_at", nullable = false, updatable = false)
  private ZonedDateTime joinedAt;

  @PrePersist
  protected void onCreate() {
    this.joinedAt = ZonedDateTime.now();
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

  /** Documentação para o método getProject. */
  public Project getProject() {
    return project;
  }

  /** Documentação para o método setProject. */
  public void setProject(Project project) {
    this.project = project;
  }

  /** Documentação para o método getUser. */
  public User getUser() {
    return user;
  }

  /** Documentação para o método setUser. */
  public void setUser(User user) {
    this.user = user;
  }

  /** Documentação para o método getRole. */
  public ProjectRole getRole() {
    return role;
  }

  /** Documentação para o método setRole. */
  public void setRole(ProjectRole role) {
    this.role = role;
  }

  /** Documentação para o método getJoinedAt. */
  public ZonedDateTime getJoinedAt() {
    return joinedAt;
  }

  /** Documentação para o método setJoinedAt. */
  public void setJoinedAt(ZonedDateTime joinedAt) {
    this.joinedAt = joinedAt;
  }
}
