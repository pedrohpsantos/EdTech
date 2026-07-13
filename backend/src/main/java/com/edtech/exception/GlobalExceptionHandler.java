package com.edtech.exception;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/** Documentação para GlobalExceptionHandler. */
@ControllerAdvice
public class GlobalExceptionHandler {

  /** Documentação. */
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, String>> handleIllegalArgumentException(
      IllegalArgumentException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(UserAlreadyMemberException.class)
  public ResponseEntity<Map<String, String>> handleUserAlreadyMemberException(
      UserAlreadyMemberException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.CONFLICT);
  }

  /** Trata requisições bloqueadas por excesso de tentativas (HTTP 429). */
  @ExceptionHandler(RateLimitExceededException.class)
  public ResponseEntity<Map<String, String>> handleRateLimitExceededException(
      RateLimitExceededException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.TOO_MANY_REQUESTS);
  }

  /** Documentação. */
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
    ex.printStackTrace();
    Map<String, String> response = new HashMap<>();
    response.put("error", "Runtime error: " + ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /** Documentação. */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
    ex.printStackTrace();
    Map<String, String> response = new HashMap<>();
    response.put("error", "Internal error: " + ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
