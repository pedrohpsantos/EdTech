package com.edtech.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.any;

import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.UserRepository;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class UserServiceSecurityTest {

  @Mock private UserRepository userRepository;

  @Mock private PasswordEncoder passwordEncoder;

  @InjectMocks private UserService userService;

  private User mockUser;

  @BeforeEach
  void setUp() {
      mockUser = new User("Auditor Malicious", "auditor.malicious@unb.br", "hashed_password", UserRole.RESEARCHER, UUID.randomUUID());
      mockUser.setActive(true);
  }

  @Test
  void testAuthenticate_PrivilegeEscalation_Fixed() {
    // Arrange
    when(userRepository.findByEmailIgnoreCase(anyString())).thenReturn(Optional.of(mockUser));
    when(passwordEncoder.matches("senha123", "hashed_password")).thenReturn(true);

    // Act
    User authenticatedUser = userService.authenticate("auditor.malicious@unb.br", "senha123");

    // Assert
    // The user's role MUST remain RESEARCHER, proving the escalation bug is fixed.
    assertEquals(UserRole.RESEARCHER, authenticatedUser.getRole());
    assertNotEquals(UserRole.AUDITOR, authenticatedUser.getRole());
    
    // Ensure that userRepository.save() was never called during authentication
    verify(userRepository, never()).save(any(User.class));
  }
}
