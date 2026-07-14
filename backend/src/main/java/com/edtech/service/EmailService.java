package com.edtech.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/** Sends account emails through the Resend HTTPS API in production and SMTP locally. */
@Service
public class EmailService {

  private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
  private static final URI RESEND_EMAILS_URI = URI.create("https://api.resend.com/emails");

  @Autowired private JavaMailSender mailSender;

  @Value("${SMTP_FROM:noreply@edtechacademic.com.br}")
  private String fromAddress;

  @Value("${SMTP_PASSWORD:}")
  private String resendApiKey;

  /** Sends the password recovery code. */
  @Async
  public void sendRecoveryEmail(String toEmail, String otpCode) {
    sendEmail(
        toEmail,
        "Código de Recuperação de Senha - EdTech",
        "Olá,\n\n"
            + "Você solicitou a recuperação da sua senha na EdTech.\n"
            + "Seu código de segurança (OTP) de 6 dígitos é: "
            + otpCode
            + "\n\n"
            + "Este código é válido por 15 minutos.\n"
            + "Se você não solicitou isso, ignore este e-mail.\n\n"
            + "Equipe EdTech");
  }

  /** Sends the registration verification code. */
  @Async
  public void sendVerificationEmail(String toEmail, String otpCode) {
    sendEmail(
        toEmail,
        "Código de Verificação de Conta - EdTech",
        "Olá,\n\n"
            + "Bem-vindo à EdTech!\n"
            + "Seu código de verificação (OTP) de 6 dígitos é: "
            + otpCode
            + "\n\n"
            + "Este código é válido por 15 minutos.\n"
            + "Se você não solicitou isso, ignore este e-mail.\n\n"
            + "Equipe EdTech");
  }

  private void sendEmail(String toEmail, String subject, String text) {
    if (resendApiKey != null && resendApiKey.startsWith("re_")) {
      sendWithResendApi(toEmail, subject, text);
      return;
    }

    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(resolveFromAddress());
    message.setTo(toEmail);
    message.setSubject(subject);
    message.setText(text);
    try {
      mailSender.send(message);
      logger.info("Email dispatched through SMTP to {}.", toEmail);
    } catch (MailException ex) {
      logger.warn("SMTP email delivery failed for {}.", toEmail, ex);
    }
  }

  private void sendWithResendApi(String toEmail, String subject, String text) {
    String payload =
        "{\"from\":\""
            + escapeJson(resolveFromAddress())
            + "\",\"to\":[\""
            + escapeJson(toEmail)
            + "\"],\"subject\":\""
            + escapeJson(subject)
            + "\",\"text\":\""
            + escapeJson(text)
            + "\"}";
    HttpRequest request =
        HttpRequest.newBuilder(RESEND_EMAILS_URI)
            .header("Authorization", "Bearer " + resendApiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(payload, StandardCharsets.UTF_8))
            .build();
    try {
      HttpResponse<String> response =
          HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
      if (response.statusCode() >= 200 && response.statusCode() < 300) {
        logger.info("Email dispatched through Resend API to {}.", toEmail);
      } else {
        logger.warn(
            "Resend API rejected email for {} with HTTP status {}.",
            toEmail,
            response.statusCode());
      }
    } catch (IOException ex) {
      logger.warn("Resend API delivery failed for {}.", toEmail, ex);
    } catch (InterruptedException ex) {
      Thread.currentThread().interrupt();
      logger.warn("Resend API delivery interrupted for {}.", toEmail, ex);
    }
  }

  private String escapeJson(String value) {
    return value
        .replace("\\", "\\\\")
        .replace("\"", "\\\"")
        .replace("\n", "\\n")
        .replace("\r", "\\r");
  }

  private String resolveFromAddress() {
    return fromAddress == null || fromAddress.isBlank()
        ? "noreply@edtechacademic.com.br"
        : fromAddress;
  }
}
