package com.edTech.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequestDTO(
    @NotBlank(message = "O email é obrigatório")
        @Email(message = "O email deve ser válido")
        @Size(max = 180)
        String email,
    @NotBlank(message = "A senha é obrigatória") @Size(min = 8, max = 120) String password) {}
