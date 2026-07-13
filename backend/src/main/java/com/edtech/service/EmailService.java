package com.edtech.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/** Documentação para EmailService. */
@Service
public class EmailService {

  private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

  @Autowired private JavaMailSender mailSender;

  @Value("${SMTP_FROM:noreply@edtechacademic.com.br}")
  private String fromAddress;

  /** Documentação. */
  @Async
  public void sendRecoveryEmail(String toEmail, String otpCode) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(resolveFromAddress());
    message.setTo(toEmail);
    message.setSubject("Código de Recuperação de Senha - EdTech");
    message.setText(
        "Olá,\n\n"
            + "Você solicitou a recuperação da sua senha na EdTech.\n"
            + "Seu código de segurança (OTP) de 6 dígitos é: "
            + otpCode
            + "\n\n"
            + "Este código é válido por 15 minutos.\n"
            + "Se você não solicitou isso, ignore este e-mail.\n\n"
            + "Equipe EdTech");

    try {
      mailSender.send(message);
      logger.info("Recovery email dispatched to {}.", toEmail);
    } catch (MailException ex) {
      logger.warn(
          "Não foi possível enviar e-mail real via SMTP "
              + "(verifique credenciais). Usando apenas simulação no console.");
    }
  }

  /** Javadoc. */
  @Async
  public void sendVerificationEmail(String toEmail, String otpCode) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(resolveFromAddress());
    message.setTo(toEmail);
    message.setSubject("Código de Verificação de Conta - EdTech");
    message.setText(
        "Olá,\n\n"
            + "Bem-vindo à EdTech!\n"
            + "Seu código de verificação (OTP) de 6 dígitos é: "
            + otpCode
            + "\n\n"
            + "Este código é válido por 15 minutos.\n"
            + "Se você não solicitou isso, ignore este e-mail.\n\n"
            + "Equipe EdTech");

    try {
      mailSender.send(message);
      logger.info("Verification email dispatched to {}.", toEmail);
    } catch (MailException ex) {
      logger.warn(
          "Não foi possível enviar e-mail real via SMTP "
              + "(verifique credenciais). Usando apenas simulação no console.");
    }
  }

  private String resolveFromAddress() {
    return fromAddress == null || fromAddress.isBlank()
        ? "noreply@edtechacademic.com.br"
        : fromAddress;
  }
}
