package com.edtech.dto;

/** Documentação para o método ResetPasswordDto. */
public record ResetPasswordDto(String email, String code, String newPassword) {}
