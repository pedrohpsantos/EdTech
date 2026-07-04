package com.edtech.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * Payload para alterar o status de um documento (aprovação/rejeição pelo orientador). Usado no
 * endpoint {@code PATCH /api/documents/{id}/status}.
 */
public record UpdateDocumentStatusRequest(
    @NotBlank(message = "O status é obrigatório")
        @Pattern(regexp = "APPROVED|REJECTED", message = "Status deve ser APPROVED ou REJECTED")
        String status,
    String feedback) {}
