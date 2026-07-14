package com.edtech.dto;

import com.edtech.model.User;
import java.time.Instant;
import java.util.UUID;

/** Documentação. */
public record UserResponseDto(
    UUID id,
    String name,
    String email,
    String role,
    boolean active,
    Instant createdAt,
    boolean mfaEnabled,
    UUID institutionId,
    String avatarUrl) {

  /** Documentação para o método from. */
  public static UserResponseDto from(User user) {
    return new UserResponseDto(
        user.getId(),
        user.getName(),
        user.getEmail(),
        user.getRole().name(),
        user.isActive(),
        user.getCreatedAt(),
        user.isMfaEnabled(),
        user.getInstitutionId(),
        user.getAvatarUrl());
  }
}
