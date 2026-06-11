package com.edTech.service;

import com.edTech.model.User;
import com.edTech.model.UserRole;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {
    @Mock
    private User mockUser;

    private JwtService jwtService;
    private final String MOCK_SECRET = "chave-secreta-muito-longa-para-validar-o-jwt-123";

    @BeforeEach
    void setUp() {
        jwtService = new JwtService(MOCK_SECRET, 60);

        // standard values for mock user
        when(mockUser.getId()).thenReturn(1L);
        when(mockUser.getEmail()).thenReturn("imalive@unb.br");
        when(mockUser.getRole()).thenReturn(UserRole.RESEARCHER);
    }

    @Test
    void generateToken_WithValidEmail_MustReturnValidJwtString() {
        // Act
        String token = jwtService.generateToken(mockUser);

        // Assert
        assertNotNull(token);
        assertFalse(token.isEmpty());
        assertEquals(3, token.split("\\.").length);
    }

    @Test
    void getUserIdFromToken_MustReturnCorrectId() {

        String token = jwtService.generateToken(mockUser);

        // Act
        Long extractedId = extractUserIdFromToken(token);

        // Assert
        assertEquals(1L, extractedId);
    }

    @Test
    @MockitoSettings(strictness = Strictness.LENIENT)
    void validateToken_WithExpiredToken_MustReturnFalse() {
        // Arrange
        String expiredToken = "jwt.com.fake.expired.time";

        // Act
        boolean isValid = jwtService.isValid(expiredToken, mockUser);

        // Assert
        assertFalse(isValid);
    }

    private Long extractUserIdFromToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(MOCK_SECRET.getBytes(StandardCharsets.UTF_8));

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("uid", Long.class);
    }
}
