package com.edtech.controller;

import com.edtech.dto.LoginRequestDto;
import com.edtech.dto.RecoveryRequestDto;
import com.edtech.dto.RegisterRequestDto;
import com.edtech.dto.ResetPasswordDto;
import com.edtech.dto.UserResponseDto;
import com.edtech.dto.VerifyCodeDto;
import com.edtech.exception.RateLimitExceededException;
import com.edtech.model.User;
import com.edtech.security.RateLimitingService;
import com.edtech.service.JwtService;
import com.edtech.service.RecoveryService;
import com.edtech.service.UserService;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Documentação para AuthController. */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final UserService userService;
  private final JwtService jwtService;
  private final RecoveryService recoveryService;
  private final RateLimitingService rateLimitingService;
  private final boolean secureCookie;
  private final long jwtExpirationMinutes;
  private final String sameSite;

  /** Documentação. */
  public AuthController(
      UserService userService,
      JwtService jwtService,
      RecoveryService recoveryService,
      RateLimitingService rateLimitingService,
      @Value("${jwt.cookie-secure:false}") boolean secureCookie,
      @Value("${jwt.expiration-minutes:60}") long jwtExpirationMinutes,
      @Value("${jwt.cookie-same-site:Lax}") String sameSite) {
    this.userService = userService;
    this.jwtService = jwtService;
    this.recoveryService = recoveryService;
    this.rateLimitingService = rateLimitingService;
    this.secureCookie = secureCookie;
    this.jwtExpirationMinutes = jwtExpirationMinutes;
    this.sameSite = sameSite;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDto request) {
    User registeredUser = userService.register(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(UserResponseDto.from(registeredUser));
  }

  /** Documentação. */
  @PostMapping("/login")
  public ResponseEntity<UserResponseDto> login(
      @Valid @RequestBody LoginRequestDto request, HttpServletRequest httpRequest) {
    Bucket bucket = rateLimitingService.resolveBucket(httpRequest.getRemoteAddr());
    if (!bucket.tryConsume(1)) {
      throw new RateLimitExceededException(
          "Limite de tentativas excedido. Tente novamente mais tarde.");
    }

    User user = userService.authenticate(request.email(), request.password());
    String token = jwtService.generateToken(user);

    return ResponseEntity.ok()
        .header("Set-Cookie", buildAuthCookie(token).toString())
        .body(UserResponseDto.from(user));
  }

  /** Documentação. */
  @PostMapping("/recovery/request")
  public ResponseEntity<?> requestRecovery(
      @RequestBody RecoveryRequestDto request, HttpServletRequest httpRequest) {
    Bucket bucket = rateLimitingService.resolveBucket(httpRequest.getRemoteAddr());
    if (!bucket.tryConsume(1)) {
      throw new RateLimitExceededException(
          "Limite de tentativas excedido. Tente novamente mais tarde.");
    }

    recoveryService.requestRecovery(request.email());
    return ResponseEntity.ok().build();
  }

  /** Documentação. */
  @PostMapping("/recovery/verify")
  public ResponseEntity<?> verifyCode(@RequestBody VerifyCodeDto request) {
    boolean valid = recoveryService.verifyCode(request.email(), request.code());
    if (valid) {
      return ResponseEntity.ok().build();
    }
    return ResponseEntity.badRequest().body("Código inválido ou expirado.");
  }

  /** Documentação. */
  @PostMapping("/recovery/reset")
  public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDto request) {
    boolean success =
        recoveryService.resetPassword(request.email(), request.code(), request.newPassword());
    if (success) {
      return ResponseEntity.ok().build();
    }
    return ResponseEntity.badRequest().body("Erro ao redefinir a senha.");
  }

  /** Documentação. */
  @PostMapping("/logout")
  public ResponseEntity<Void> logout() {
    ResponseCookie clearedCookie =
        ResponseCookie.from("token", "")
            .httpOnly(true)
            .secure(secureCookie)
            .sameSite(sameSite)
            .path("/")
            .maxAge(0)
            .build();

    return ResponseEntity.ok().header("Set-Cookie", clearedCookie.toString()).build();
  }

  @GetMapping("/me")
  public ResponseEntity<UserResponseDto> me(Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.ok(UserResponseDto.from(user));
  }

  private ResponseCookie buildAuthCookie(String token) {
    return ResponseCookie.from("token", token)
        .httpOnly(true)
        .secure(secureCookie)
        .sameSite(sameSite)
        .path("/")
        .maxAge(Duration.ofMinutes(jwtExpirationMinutes))
        .build();
  }
}
