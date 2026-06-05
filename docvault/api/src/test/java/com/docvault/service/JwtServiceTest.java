package com.docvault.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
    }

    @Test
    void generateToken_WithValidEmail_MustReturnValidJwtString() {
        // Arrange
        String email = "imalive@unb.br";

        // Act
        String token = jwtService.generateToken(email);

        // Assert
        assertNotNull(token);
        assertFalse(token.isEmpty());
        assertEquals(3, token.split("\\.").length);
    }

    @Test
    void getUserIdFromToken_WithValidToken_MustReturnCorrectId() {
        // Arrange
        String email = "imalive@unb.br";
        String token = jwtService.generateToken(email);
        Long expectedId = 1L;

        // Act
        Long extractedId = jwtService.getUserIdFromToken(token);

        // Assert
        assertEquals(expectedId, extractedId);
    }

    @Test
    void validateToken_WithExpiredToken_MustThrowException() {
        // Arrange
        String expiredToken = "jwt.com.fake.expired.time";

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> jwtService.validateToken(expiredToken));
    }
}
