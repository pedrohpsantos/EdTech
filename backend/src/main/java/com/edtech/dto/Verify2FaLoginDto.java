package com.edtech.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Javadoc. */
public record Verify2FaLoginDto(
    @NotBlank(message = "E-mail é obrigatório.") @Email(message = "E-mail inválido.") String email,
    @NotBlank(message = "Senha é obrigatória.") String password,
    @NotBlank(message = "Código é obrigatório.")
        @Size(min = 6, max = 6, message = "Código deve ter 6 dígitos.")
        String code) {}
