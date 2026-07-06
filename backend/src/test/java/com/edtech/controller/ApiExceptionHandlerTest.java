package com.edtech.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.edtech.dto.ErrorResponse;
import com.edtech.service.DuplicateEmailException;
import com.edtech.service.InvalidCredentialsException;
import com.edtech.service.InvalidInstitutionalEmailException;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import jakarta.validation.ConstraintViolationException;

class ApiExceptionHandlerTest {

  private final ApiExceptionHandler exceptionHandler = new ApiExceptionHandler();

  @Test
  void handleDuplicateEmail_ReturnsConflict() {
    DuplicateEmailException ex = new DuplicateEmailException("Email already exists");
    ResponseEntity<ErrorResponse> response = exceptionHandler.handleDuplicateEmail(ex);

    assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    assertNotNull(response.getBody());
    assertEquals("email_already_registered", response.getBody().code());
    assertEquals("Email already exists", response.getBody().message());
  }

  @Test
  void handleInvalidInstitutionalEmail_ReturnsBadRequest() {
    InvalidInstitutionalEmailException ex = new InvalidInstitutionalEmailException("Invalid email");
    ResponseEntity<ErrorResponse> response = exceptionHandler.handleInvalidInstitutionalEmail(ex);

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertNotNull(response.getBody());
    assertEquals("invalid_institutional_email", response.getBody().code());
    assertEquals("Invalid email", response.getBody().message());
  }

  @Test
  void handleInvalidCredentials_ReturnsUnauthorized() {
    ResponseEntity<ErrorResponse> response = exceptionHandler.handleInvalidCredentials();

    assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    assertNotNull(response.getBody());
    assertEquals("invalid_credentials", response.getBody().code());
    assertEquals("Credenciais inválidas.", response.getBody().message());
  }

  @Test
  void handleValidationException_ReturnsBadRequest() {
    ResponseEntity<ErrorResponse> response = exceptionHandler.handleValidationException(new Exception("validation error"));

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertNotNull(response.getBody());
    assertEquals("invalid_request", response.getBody().code());
    assertEquals("Verifique os dados enviados.", response.getBody().message());
  }
}
