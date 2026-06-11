package com.edTech.service;

import com.edTech.dto.RegisterRequest;
import com.edTech.model.User;
import com.edTech.model.UserRole;
import com.edTech.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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
        RegisterRequest dto = new RegisterRequest("SchrodingerCat", "imalive@unb.br", "not_alive12");
        User savedUser = new User("SchrodingerCat", "imalive@unb.br", "$2a$12$hashBcryptExample...", UserRole.RESEARCHER);

        when(passwordEncoder.encode(anyString())).thenReturn("hashed_password");

        when(userRepository.existsByEmailIgnoreCase(dto.email())).thenReturn(false);
        when(userRepository.save(any())).thenReturn(savedUser);

        // Act
        User result = userService.register(dto);

        // Assert
        assertNotNull(result);
        assertEquals("imalive@unb.br", result.getEmail());
        verify(passwordEncoder, times(1)).encode(dto.password());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_WithInvalidDomain_MustThrowException() {
        // Arrange - E-mail from outside UnB
        RegisterRequest dto = new RegisterRequest("SchrodingerCat", "imalive@gmail.com", "not_alive12");

        // Act & Assert (Capture the exception validation that the service must throw)
        assertThrows(InvalidInstitutionalEmailException.class, () -> userService.register(dto));
    }

    @Test
    void register_WithDuplicateEMail_MustThrowException() {
        // Arrange - The E-mail MUST be @unb.br for pass the first validation
        RegisterRequest dto = new RegisterRequest("SchrodingerCat", "imalive@unb.br", "not_alive12");

        when(userRepository.existsByEmailIgnoreCase("imalive@unb.br")).thenReturn(true);

        // Act & Assert
        assertThrows(DuplicateEmailException.class, () -> userService.register(dto));

        verify(userRepository, never()).save(any(User.class));
    }

}
