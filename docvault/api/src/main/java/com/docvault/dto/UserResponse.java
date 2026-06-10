package com.docvault.dto;

import com.docvault.model.User;

import java.time.Instant;

public record UserResponse(
        Long id,
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
