package com.edtech.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/** Documentação para EmailService. */
@Service
public class EmailService {

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

    mailSender.send(message);
  }
}
