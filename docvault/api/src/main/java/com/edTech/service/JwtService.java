package com.edTech.service;

import com.edTech.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  private final SecretKey secretKey;
  private final Duration expiration;

  public JwtService(
      @Value("${jwt.secret:}") String secret,
      @Value("${jwt.expiration-minutes:60}") long expirationMinutes) {
    if (secret == null || secret.isBlank()) {
      throw new IllegalStateException("JWT_SECRET deve ser definido para autenticação.");
    }
    this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.expiration = Duration.ofMinutes(expirationMinutes);
  }

  public String generateToken(User user) {
    return generateToken(user, expiration);
  }

  public String generateToken(User user, Duration tokenTtl) {
    Instant now = Instant.now();
    Instant expiresAt = now.plus(tokenTtl);

    return Jwts.builder()
        .subject(user.getEmail())
        .claim("uid", user.getId().toString())
        .claim("role", user.getRole().name())
        .issuedAt(Date.from(now))
        .expiration(Date.from(expiresAt))
        .signWith(secretKey)
        .compact();
  }

  public String extractSubject(String token) {
    return validateToken(token).getSubject();
  }

  public UUID getUserIdFromToken(String token) {
    Claims claims = validateToken(token);
    String uidStr = claims.get("uid", String.class);
    return UUID.fromString(uidStr);
  }

  public boolean isValid(String token, User user) {
    try {
      String subject = extractSubject(token);
      return subject != null && subject.equalsIgnoreCase(user.getEmail());
    } catch (JwtException | IllegalArgumentException exception) {
      return false;
    }
  }

  public Claims validateToken(String token) {
    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
  }
}
