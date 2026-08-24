package com.edtech.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Documentação para o método VerifyCodeDto. */
public record VerifyCodeDto(
    @NotBlank(message = "E-mail é obrigatório") @Email(message = "E-mail inválido") @Size(max = 180)
        String email,
    @NotBlank(message = "Código é obrigatório") @Size(min = 4, max = 10) String code) {}
