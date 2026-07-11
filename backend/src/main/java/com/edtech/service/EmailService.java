package com.edtech.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

  /** Documentação. */
  @Async
  public void sendRecoveryEmail(String toEmail, String otpCode) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("noreply@edtech.com");
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

    logger.info("======= E-MAIL SIMULADO NO CONSOLE =======");
    logger.info(
        "De: noreply@edtech.com\nPara: {}\nAssunto: {}\nCorpo:\n{}",
        message.getTo()[0],
        message.getSubject(),
        message.getText());
    logger.info("=========================================");

    try {
      mailSender.send(message);
    } catch (MailException ex) {
      logger.warn(
          "Não foi possível enviar e-mail real via SMTP (verifique credenciais). Usando apenas simulação no console.");
    }
  }

  @Async
  public void sendVerificationEmail(String toEmail, String otpCode) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("noreply@edtech.com");
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

    logger.info("======= E-MAIL SIMULADO NO CONSOLE =======");
    logger.info(
        "De: noreply@edtech.com\nPara: {}\nAssunto: {}\nCorpo:\n{}",
        message.getTo()[0],
        message.getSubject(),
        message.getText());
    logger.info("=========================================");

    try {
      mailSender.send(message);
    } catch (MailException ex) {
      logger.warn(
          "Não foi possível enviar e-mail real via SMTP (verifique credenciais). Usando apenas simulação no console.");
    }
  }
}
