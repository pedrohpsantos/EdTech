package com.edtech.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import com.edtech.model.User;
import com.edtech.model.UserRole;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {
  @Mock private User mockUser;

  private JwtService jwtService;
  private final String MOCK_SECRET = "chave-secreta-muito-longa-para-validar-o-jwt-123";

  private UUID testUuid;

  @BeforeEach
  void setUp() {
    jwtService = new JwtService(MOCK_SECRET, 60);

    testUuid = UUID.randomUUID();
    // standard values for mock user
    when(mockUser.getId()).thenReturn(testUuid);
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
    UUID extractedId = extractUserIdFromToken(token);

    // Assert
    assertEquals(testUuid, extractedId);
  }

  @Test
  @MockitoSettings(strictness = Strictness.LENIENT)
  void validateToken_WithExpireDtoken_MustReturnFalse() {
    // Arrange
    String expireDtoken = "jwt.com.fake.expired.time";

    // Act
    boolean isValid = jwtService.isValid(expireDtoken, mockUser);

    // Assert
    assertFalse(isValid);
  }

  private UUID extractUserIdFromToken(String token) {
    SecretKey key = Keys.hmacShaKeyFor(MOCK_SECRET.getBytes(StandardCharsets.UTF_8));

    String uidStr =
        Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .get("uid", String.class);
    return UUID.fromString(uidStr);
  }
}
