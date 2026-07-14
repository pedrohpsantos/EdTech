package com.edtech.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Dados editáveis do perfil autenticado. */
public record UpdateProfileRequestDto(
    @NotBlank @Size(max = 120) String name, @Size(max = 2_000_000) String avatarUrl) {}
