package com.edtech.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.edtech.dto.RegisterRequestDto;
import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
  @Mock private UserRepository userRepository;
  @Mock private PasswordEncoder passwordEncoder;
  @Mock private com.edtech.repository.VerificationTokenRepository verificationTokenRepository;
  @Mock private EmailService emailService;

  @InjectMocks private UserService userService;

  @Test
  void register_WithValidData_MustSavedInDataBase() {
    // Arrange - Data in official pattern @unb.br
    RegisterRequestDto Dto =
        new RegisterRequestDto(
            "SchrodingerCat", "imalive@unb.br", "not_alive12", UserRole.RESEARCHER);
    User savedUser =
        new User(
            Dto.name(),
            Dto.email(),
            "hashed_password",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());

    when(passwordEncoder.encode(anyString())).thenReturn("hashed_password");

    when(userRepository.existsByEmailIgnoreCase(Dto.email())).thenReturn(false);
    when(userRepository.save(any())).thenReturn(savedUser);

    // Act
    User result = userService.register(Dto);

    // Assert
    assertNotNull(result);
    assertEquals("imalive@unb.br", result.getEmail());
    verify(passwordEncoder, times(1)).encode(Dto.password());
    verify(userRepository, times(1)).save(any(User.class));
  }

  @Test
  void register_WithInvalidDomain_MustThrowException() {
    // Arrange - E-mail from outside UnB
    RegisterRequestDto Dto =
        new RegisterRequestDto(
            "SchrodingerCat", "imalive@gmail.com", "not_alive12", UserRole.RESEARCHER);

    // Act & Assert (Capture the exception validation that the service must throw)
    assertThrows(InvalidInstitutionalEmailException.class, () -> userService.register(Dto));
  }

  @Test
  void register_WithDuplicateEMail_MustThrowException() {
    // Arrange - The E-mail MUST be @unb.br for pass the first validation
    RegisterRequestDto Dto =
        new RegisterRequestDto(
            "SchrodingerCat", "imalive@unb.br", "not_alive12", UserRole.RESEARCHER);

    when(userRepository.existsByEmailIgnoreCase("imalive@unb.br")).thenReturn(true);

    // Act & Assert
    assertThrows(DuplicateEmailException.class, () -> userService.register(Dto));

    verify(userRepository, never()).save(any(User.class));
  }

  @Test
  void register_WithValidSubdomainData_MustSavedInDataBase() {
    RegisterRequestDto Dto =
        new RegisterRequestDto(
            "SchrodingerCat", "student@fga.unb.br", "not_alive12", UserRole.RESEARCHER);
    User savedUser =
        new User(
            "SchrodingerCat",
            "student@fga.unb.br",
            "$2a$12$hashBcryptExample...",
            UserRole.RESEARCHER,
            java.util.UUID.randomUUID());

    when(passwordEncoder.encode(anyString())).thenReturn("hashed_password");
    when(userRepository.existsByEmailIgnoreCase(Dto.email())).thenReturn(false);
    when(userRepository.save(any())).thenReturn(savedUser);

    User result = userService.register(Dto);

    assertNotNull(result);
    assertEquals("student@fga.unb.br", result.getEmail());
    verify(userRepository, times(1)).save(any(User.class));
  }

  @Test
  void authenticate_Success() {
    User user =
        new User(
            "Name", "test@unb.br", "hashed_pw", UserRole.RESEARCHER, java.util.UUID.randomUUID());
    user.setActive(true);
    when(userRepository.findByEmailIgnoreCase("test@unb.br"))
        .thenReturn(java.util.Optional.of(user));
    when(passwordEncoder.matches("password", "hashed_pw")).thenReturn(true);

    User result = userService.authenticate("test@unb.br", "password");
    assertNotNull(result);
  }

  @Test
  void authenticate_UserNotFound_ThrowsException() {
    when(userRepository.findByEmailIgnoreCase("test@unb.br"))
        .thenReturn(java.util.Optional.empty());
    assertThrows(
        InvalidCredentialsException.class,
        () -> userService.authenticate("test@unb.br", "password"));
  }

  @Test
  void authenticate_WrongPassword_ThrowsException() {
    User user =
        new User(
            "Name", "test@unb.br", "hashed_pw", UserRole.RESEARCHER, java.util.UUID.randomUUID());
    user.setActive(true);
    when(userRepository.findByEmailIgnoreCase("test@unb.br"))
        .thenReturn(java.util.Optional.of(user));
    when(passwordEncoder.matches("wrong_pw", "hashed_pw")).thenReturn(false);

    assertThrows(
        InvalidCredentialsException.class,
        () -> userService.authenticate("test@unb.br", "wrong_pw"));
  }

  @Test
  void authenticate_InactiveUser_ThrowsException() {
    User user =
        new User(
            "Name", "test@unb.br", "hashed_pw", UserRole.RESEARCHER, java.util.UUID.randomUUID());
    user.setActive(false);
    when(userRepository.findByEmailIgnoreCase("test@unb.br"))
        .thenReturn(java.util.Optional.of(user));

    assertThrows(
        AccountNotVerifiedException.class,
        () -> userService.authenticate("test@unb.br", "password"));
  }

  @Test
  void register_WithAuditorEmail_AssignsAuditorRole() {
    RegisterRequestDto dto =
        new RegisterRequestDto("Auditor", "auditor@unb.br", "pass", UserRole.AUDITOR);
    when(passwordEncoder.encode(anyString())).thenReturn("hashed");
    when(userRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

    User result = userService.register(dto);
    assertEquals(UserRole.AUDITOR, result.getRole());
  }

  @Test
  void register_WithOrientadorEmail_AssignsAdvisorRole() {
    RegisterRequestDto dto =
        new RegisterRequestDto("Orientador", "orientador@unb.br", "pass", UserRole.ADVISOR);
    when(passwordEncoder.encode(anyString())).thenReturn("hashed");
    when(userRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

    User result = userService.register(dto);
    assertEquals(UserRole.ADVISOR, result.getRole());
  }

  @Test
  void authenticate_AuditorEmail_UpdatesRoleToAuditor() {
    User user =
        new User(
            "Auditor",
            "auditor@unb.br",
            "hashed_pw",
            UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    user.setActive(true);
    when(userRepository.findByEmailIgnoreCase("auditor@unb.br"))
        .thenReturn(java.util.Optional.of(user));
    when(passwordEncoder.matches("password", "hashed_pw")).thenReturn(true);

    User result = userService.authenticate("auditor@unb.br", "password");
    assertEquals(UserRole.AUDITOR, result.getRole());
    verify(userRepository, times(1)).save(user);
  }

  @Test
  void authenticate_OrientadorEmail_UpdatesRoleToAdvisor() {
    User user =
        new User(
            "Orientador",
            "orientador@unb.br",
            "hashed_pw",
            UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    user.setActive(true);
    when(userRepository.findByEmailIgnoreCase("orientador@unb.br"))
        .thenReturn(java.util.Optional.of(user));
    when(passwordEncoder.matches("password", "hashed_pw")).thenReturn(true);

    User result = userService.authenticate("orientador@unb.br", "password");
    assertEquals(UserRole.ADVISOR, result.getRole());
    verify(userRepository, times(1)).save(user);
  }
}
