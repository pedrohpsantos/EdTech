package com.edTech.dto;

import com.edTech.model.User;

import java.time.Instant;
import java.util.UUID;

public record UserResponseDTO(
        UUID id,
        String name,
        String email,
        String role,
        boolean active,
        Instant createdAt
) {

    public static UserResponseDTO from(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.isActive(),
                user.getCreatedAt()
        );
    }
}
