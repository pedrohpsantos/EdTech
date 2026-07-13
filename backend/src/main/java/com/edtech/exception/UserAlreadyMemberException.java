package com.edtech.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyMemberException extends RuntimeException {
  public UserAlreadyMemberException(String message) {
    super(message);
  }
}
