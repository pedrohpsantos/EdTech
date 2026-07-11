package com.edtech.controller;

import com.edtech.dto.ErrorResponse;
import com.edtech.service.DuplicateEmailException;
import com.edtech.service.InvalidCredentialsException;
import com.edtech.service.InvalidInstitutionalEmailException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/** Documentação para ApiExceptionHandler. */
@RestControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(DuplicateEmailException.class)
  public ResponseEntity<ErrorResponse> handleDuplicateEmail(DuplicateEmailException exception) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(new ErrorResponse("email_already_registered", exception.getMessage()));
  }

  @ExceptionHandler(InvalidInstitutionalEmailException.class)
  public ResponseEntity<ErrorResponse> handleInvalidInstitutionalEmail(
      InvalidInstitutionalEmailException exception) {
    return ResponseEntity.badRequest()
        .body(new ErrorResponse("invalid_institutional_email", exception.getMessage()));
  }

  @ExceptionHandler(InvalidCredentialsException.class)
  public ResponseEntity<ErrorResponse> handleInvalidCredentials() {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(new ErrorResponse("invalid_credentials", "Credenciais inválidas."));
  }

  @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
  public ResponseEntity<ErrorResponse> handleValidationException(Exception exception) {
    return ResponseEntity.badRequest()
        .body(new ErrorResponse("invalid_request", "Verifique os dados enviados."));
  }

  /** Javadoc. */
  @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
  public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(
      org.springframework.dao.DataIntegrityViolationException exception) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(
            new ErrorResponse(
                "email_already_registered", "Conflito de dados. Verifique unicidade."));
  }
}
