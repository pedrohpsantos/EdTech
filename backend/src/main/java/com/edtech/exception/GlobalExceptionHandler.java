package com.edtech.exception;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/** DocumentaçãonHandler. */
@ControllerAdvice
@Order(org.springframework.core.Ordered.LOWEST_PRECEDENCE)
public class GlobalExceptionHandler {

  private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  /** Documentação. */
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, String>> handleIllegalArgumentException(
      IllegalArgumentException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  /** Documentação. */
  @ExceptionHandler(UserAlreadyMemberException.class)
  public ResponseEntity<Map<String, String>> handleUserAlreadyMemberException(
      UserAlreadyMemberException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", ex.getMessage());
    return new ResponseEntity<>(response, HttpStatus.CONFLICT);
  }

  /** Trata requisiçõesso de tentativas (HTTP 429). */
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
    log.error("Unhandled runtime exception", ex);
    Map<String, String> response = new HashMap<>();
    response.put("error", "Erro interno. Contacte o suporte.");
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /** Documentação. */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
    log.error("Unhandled exception", ex);
    Map<String, String> response = new HashMap<>();
    response.put("error", "Erro interno. Contacte o suporte.");
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
