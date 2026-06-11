package com.edTech.dto;

import com.edTech.model.User;

import java.time.Instant;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String name,
        String email,
        String role,
        boolean active,
        Instant createdAt
) {

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.isActive(),
                user.getCreatedAt()
        );
    }
}
