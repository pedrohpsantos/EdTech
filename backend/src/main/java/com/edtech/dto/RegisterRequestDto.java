package com.edtech.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/** Documentação. */
public record RegisterRequestDto(
    @NotBlank(message = "Nome é obrigatório") @Size(max = 120) String name,
    @NotBlank(message = "E-mail é obrigatório")
        @Email(message = "E-mail inválido")
        @Pattern(
            regexp = "^.+@(unb\\.br|.+\\.unb\\.br)$",
            message = "E-mail deve ser do domínio UNB")
        @Size(max = 180)
        String email,
    @NotBlank(message = "A senha é obrigatória") @Size(min = 8, max = 120) String password,
    @jakarta.validation.constraints.NotNull(message = "O perfil (role) é obrigatório") com.edtech.model.UserRole role) {}
