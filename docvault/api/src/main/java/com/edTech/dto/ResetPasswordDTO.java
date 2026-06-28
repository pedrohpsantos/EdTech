package com.edTech.dto;

public record ResetPasswordDTO(String email, String code, String newPassword) {}
