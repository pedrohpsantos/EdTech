package com.edtech.service;

/** Raised when a valid account has not completed e-mail verification. */
public class AccountNotVerifiedException extends RuntimeException {
  public AccountNotVerifiedException() {
    super("Conta ainda não verificada. Informe o código enviado por e-mail.");
  }
}
