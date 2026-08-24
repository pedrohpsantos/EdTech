package com.edtech.exception;

/** Exceção lançada quando o limite de requisições por IP é excedido (HTTP 429). */
public class RateLimitExceededException extends RuntimeException {

  /** Construtor com mensagem de erro. */
  public RateLimitExceededException(String message) {
    super(message);
  }
}
