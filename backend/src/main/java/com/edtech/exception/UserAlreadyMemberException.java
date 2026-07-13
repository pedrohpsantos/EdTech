package com.edtech.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/** Exception thrown when a user is already a member of a project. */
@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyMemberException extends RuntimeException {
  public UserAlreadyMemberException(String message) {
    super(message);
  }
}
