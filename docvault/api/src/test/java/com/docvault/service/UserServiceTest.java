package com.docvault.service;

import com.docvault.dto.RegisterRequestDTO;
import com.docvault.model.User;
import com.docvault.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void register_WithValidData_MustSavedInDataBase() {
        // Arrange - Data in official pattern @unb.br
        RegisterRequestDTO dto = new RegisterRequestDTO("SchrodingerCat", "imalive@unb.br", "not_alive12");
        User savedUser = new User("SchrodingerCat", "imalive@unb.br", "$2a$12$hashBcryptExample...", "USER", true);

        Mockito.when(passwordEncoder.encode(Mockito.anyString())).thenReturn("hashed_password");
        Mockito.when(userRepository.findByEmail(dto.getEmail())).thenReturn(Optional.empty());
        Mockito.when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Act
        User result = userService.register(dto);

        // Assert
        assertNotNull(result);
        assertEquals("imalive@unb.br", result.getEmail());
        Mockito.verify(passwordEncoder, Mockito.times(1)).encode(dto.getPassword());
    }

    @Test
    void register_WithInvalidDomain_MustThrowException() {
        // Arrange - E-mail from outside UnB
        RegisterRequestDTO dto = new RegisterRequestDTO("SchrodingerCat", "imalive@gmail.com", "not_alive12");

        // Act & Assert (Capture the exception validation that the service must throw)
        assertThrows(IllegalArgumentException.class, () -> userService.register(dto));
    }

    @Test
    void register_WithDuplicateEMail_MustThrowException() {
        // Arrange - The E-mail MUST be @unb.br for pass the first validation
        RegisterRequestDTO dto = new RegisterRequestDTO("SchrodingerCat", "imalive@unb.br", "not_alive12");

        Mockito.when(userRepository.findByEmail(dto.getEmail())).thenReturn(Optional.of(new User()));

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> userService.register(dto));

        Mockito.verify(userRepository, Mockito.never()).save(Mockito.any(User.class));
    }

}
