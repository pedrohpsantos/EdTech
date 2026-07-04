package com.edTech.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import com.edTech.model.RecoveryToken;
import com.edTech.model.User;
import com.edTech.model.UserRole;
import com.edTech.repository.RecoveryTokenRepository;
import com.edTech.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class RecoveryServiceTest {

  @Mock private UserRepository userRepository;

  @Mock private RecoveryTokenRepository recoveryTokenRepository;

  @Mock private EmailService emailService;

  @Mock private PasswordEncoder passwordEncoder;

  @InjectMocks private RecoveryService recoveryService;

  private User mockUser;
  private final String EMAIL = "teste@unb.br";

  @BeforeEach
  void setUp() {
    mockUser = new User("Teste", EMAIL, "hash_antigo", UserRole.RESEARCHER);
  }

  @Test
  void requestRecovery_WhenUserExists_ShouldGenerateTokenAndSendEmail() {
    when(userRepository.findByEmailIgnoreCase(EMAIL)).thenReturn(Optional.of(mockUser));

    recoveryService.requestRecovery(EMAIL);

    verify(recoveryTokenRepository, times(1)).deleteByEmail(EMAIL);
    verify(recoveryTokenRepository, times(1)).save(any(RecoveryToken.class));
    verify(emailService, times(1)).sendRecoveryEmail(eq(EMAIL), anyString());
  }

  @Test
  void requestRecovery_WhenUserDoesNotExist_ShouldNotDoAnything() {
    when(userRepository.findByEmailIgnoreCase("fake@unb.br")).thenReturn(Optional.empty());

    recoveryService.requestRecovery("fake@unb.br");

    verify(recoveryTokenRepository, never()).deleteByEmail(anyString());
    verify(recoveryTokenRepository, never()).save(any(RecoveryToken.class));
    verify(emailService, never()).sendRecoveryEmail(anyString(), anyString());
  }

  @Test
  void verifyCode_WhenCodeIsValid_ShouldReturnTrue() {
    RecoveryToken token = new RecoveryToken("123456", EMAIL, LocalDateTime.now().plusMinutes(10));
    when(recoveryTokenRepository.findByEmailAndToken(EMAIL, "123456"))
        .thenReturn(Optional.of(token));

    boolean isValid = recoveryService.verifyCode(EMAIL, "123456");

    assertTrue(isValid);
  }

  @Test
  void verifyCode_WhenCodeIsExpired_ShouldReturnFalse() {
    RecoveryToken token = new RecoveryToken("123456", EMAIL, LocalDateTime.now().minusMinutes(5));
    when(recoveryTokenRepository.findByEmailAndToken(EMAIL, "123456"))
        .thenReturn(Optional.of(token));

    boolean isValid = recoveryService.verifyCode(EMAIL, "123456");

    assertFalse(isValid);
  }

  @Test
  void resetPassword_WhenCodeIsValidAndUserExists_ShouldUpdatePassword() {
    RecoveryToken token = new RecoveryToken("123456", EMAIL, LocalDateTime.now().plusMinutes(10));
    when(recoveryTokenRepository.findByEmailAndToken(EMAIL, "123456"))
        .thenReturn(Optional.of(token));
    when(userRepository.findByEmailIgnoreCase(EMAIL)).thenReturn(Optional.of(mockUser));
    when(passwordEncoder.encode("nova_senha")).thenReturn("hash_novo");

    boolean result = recoveryService.resetPassword(EMAIL, "123456", "nova_senha");

    assertTrue(result);
    verify(userRepository, times(1)).save(mockUser);
    assertEquals("hash_novo", mockUser.getPasswordHash());
    verify(recoveryTokenRepository, times(1)).deleteByEmail(EMAIL);
  }
}
