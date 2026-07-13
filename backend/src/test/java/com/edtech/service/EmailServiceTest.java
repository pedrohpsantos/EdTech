package com.edtech.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

  @Mock private JavaMailSender mailSender;

  @Captor private ArgumentCaptor<SimpleMailMessage> messageCaptor;

  @InjectMocks private EmailService emailService;

  @Test
  void testSendRecoveryEmail() {
    emailService.sendRecoveryEmail("test@example.com", "123456");

    verify(mailSender).send(messageCaptor.capture());

    SimpleMailMessage captured = messageCaptor.getValue();
    assertEquals("noreply@edtechacademic.com.br", captured.getFrom());
    assertEquals("test@example.com", captured.getTo()[0]);
    assertEquals("Código de Recuperação de Senha - EdTech", captured.getSubject());
    assertTrue(captured.getText().contains("123456"));
  }
}
