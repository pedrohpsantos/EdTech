package com.docvault.service;

import com.docvault.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey secretKey;
    private final Duration expiration;

    public JwtService(
            @Value("${jwt.secret:}") String secret,
            @Value("${jwt.expiration-minutes:60}") long expirationMinutes
    ) {
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
                .claim("uid", user.getId())
                .claim("role", user.getRole().name())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiresAt))
                .signWith(secretKey)
                .compact();
    }

    public String extractSubject(String token) {
        return parseClaims(token).getSubject();
    }

    public boolean isValid(String token, User user) {
        try {
            String subject = extractSubject(token);
            return subject != null && subject.equalsIgnoreCase(user.getEmail());
        } catch (JwtException | IllegalArgumentException exception) {
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }



}
