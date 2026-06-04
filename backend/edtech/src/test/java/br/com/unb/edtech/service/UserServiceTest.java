package br.com.unb.edtech.service;

import br.com.unb.edtech.dto.RegisterDto;
import br.com.unb.edtech.model.User;
import br.com.unb.edtech.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void register_WithValidData_MustSavedInDataBase() {
        // Arrange - Data in official pattern @unb.br
        RegisterDto dto = new RegisterDto("SchrodingerCat", "imalive@unb.br", "not_alive12");
        User savedUser = User.builder()
                .id(1L)
                .name("SchrodingerCat")
                .email("imalive@unb.br")
                .passwordHash("$2a$12$hashBcryptExample...")
                .build();

        Mockito.when(userRepository.existsByEmail(dto.getEmail())).thenReturn(false);
        Mockito.when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Act
        User result = userService.register(dto);

        // Assert
        assertNotNull(result);
        assertEquals("imalive@unb.br", result.getEmail());
    }

    @Test
    void register_WithInvalidDomain_MustThrowException() {
        // Arrange - E-mail from outside UnB
        RegisterDto dto = new RegisterDto("SchrodingerCat", "imalive@gmail.com", "not_alive12");

        // Act & Assert (Capture the exception validation that the service must throw)
        assertThrows(IllegalArgumentException.class, () -> userService.register(dto));
    }

    @Test
    void register_WithDuplicateEMail_MustThrowException() {
        // Arrange - The E-mail MUST be @unb.br for pass the first validation
        RegisterDto dto = new RegisterDto("SchrodingerCat", "imalive@unb.br", "not_alive12");

        Mockito.when(userRepository.existsByEmail(dto.getEmail())).thenReturn(true);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> userService.register(dto));

        Mockito.verify(userRepository, Mockito.never()).save(Mockito.any(User.class));
    }

}
