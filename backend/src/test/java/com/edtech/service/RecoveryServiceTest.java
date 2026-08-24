package com.edtech.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import com.edtech.model.RecoveryToken;
import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.RecoveryTokenRepository;
import com.edtech.repository.UserRepository;
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

  private static final String MOCK_NEW_VAL = java.util.UUID.randomUUID().toString(); // NOSONAR: test-only value
  private static final String MOCK_HASH_VAL = java.util.UUID.randomUUID().toString(); // NOSONAR: test-only value

  @Mock
  private UserRepository userRepository;

  @Mock
  private RecoveryTokenRepository recoveryTokenRepository;

  @Mock
  private EmailService emailService;

  @Mock
  private PasswordEncoder passwordEncoder;

  @InjectMocks
  private RecoveryService recoveryService;

  private User mockUser;
  private final String EMAIL = "teste@unb.br";

  @BeforeEach
  void setUp() {
    mockUser = new User("Teste", EMAIL, "hash_antigo", UserRole.RESEARCHER, java.util.UUID.randomUUID());
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
    when(passwordEncoder.encode(MOCK_NEW_VAL)).thenReturn(MOCK_HASH_VAL);

    boolean result = recoveryService.resetPassword(EMAIL, "123456", MOCK_NEW_VAL);

    assertTrue(result);
    verify(userRepository, times(1)).save(mockUser);
    assertEquals(MOCK_HASH_VAL, mockUser.getPasswordHash());
    verify(recoveryTokenRepository, times(1)).deleteByEmail(EMAIL);
  }

  @Test
  void requestRecovery_WhenIsDemoAccount_ShouldReturnEarly() {
    recoveryService.requestRecovery("admin.demo@unb.br");
    verify(recoveryTokenRepository, never()).save(any());
    verify(emailService, never()).sendRecoveryEmail(anyString(), anyString());
  }

  @Test
  void verifyCode_WhenTokenIsNotFound_ShouldReturnFalse() {
    when(recoveryTokenRepository.findByEmailAndToken(EMAIL, "999999")).thenReturn(Optional.empty());
    boolean isValid = recoveryService.verifyCode(EMAIL, "999999");
    assertFalse(isValid);
  }

  @Test
  void resetPassword_WhenIsDemoAccount_ShouldReturnFalse() {
    boolean result = recoveryService.resetPassword("admin.demo@unb.br", "123456", "nova");
    assertFalse(result);
  }

  @Test
  void resetPassword_WhenTokenIsInvalid_ShouldReturnFalse() {
    when(recoveryTokenRepository.findByEmailAndToken(EMAIL, "123456")).thenReturn(Optional.empty());
    boolean result = recoveryService.resetPassword(EMAIL, "123456", "nova_senha");
    assertFalse(result);
  }

  @Test
  void resetPassword_WhenUserDoesNotExist_ShouldReturnFalse() {
    RecoveryToken token = new RecoveryToken("123456", EMAIL, LocalDateTime.now().plusMinutes(10));
    when(recoveryTokenRepository.findByEmailAndToken(EMAIL, "123456"))
        .thenReturn(Optional.of(token));
    when(userRepository.findByEmailIgnoreCase(EMAIL)).thenReturn(Optional.empty());

    boolean result = recoveryService.resetPassword(EMAIL, "123456", "nova_senha");
    assertFalse(result);
  }
}
