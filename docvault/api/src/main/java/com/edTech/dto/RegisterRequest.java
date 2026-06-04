package com.docvault.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank
        @Size(max = 120)
        String name,

        @NotBlank
        @Email
        @Size(max = 180)
        String email,

        @NotBlank
        @Size(min = 8, max = 120)
        String password
) {
}
