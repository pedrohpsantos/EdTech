package com.edtech.controller;

import com.edtech.dto.AuthResponseDto;
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
import org.springframework.http.HttpStatus;
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

  /** Documentação. */
  public AuthController(
      UserService userService,
      JwtService jwtService,
      RecoveryService recoveryService,
      RateLimitingService rateLimitingService) {
    this.userService = userService;
    this.jwtService = jwtService;
    this.recoveryService = recoveryService;
    this.rateLimitingService = rateLimitingService;
  }

  /** Documentação. */
  @PostMapping("/register")
  public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterRequestDto request) {
    User registeredUser = userService.register(request);
    String token = jwtService.generateToken(registeredUser);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(new AuthResponseDto(UserResponseDto.from(registeredUser), token));
  }

  /** Documentação. */
  @PostMapping("/login")
  public ResponseEntity<AuthResponseDto> login(
      @Valid @RequestBody LoginRequestDto request, HttpServletRequest httpRequest) {
    Bucket bucket = rateLimitingService.resolveBucket(httpRequest.getRemoteAddr());
    if (!bucket.tryConsume(1)) {
      throw new RateLimitExceededException(
          "Limite de tentativas excedido. Tente novamente mais tarde.");
    }

    User user = userService.authenticate(request.email(), request.password());
    String token = jwtService.generateToken(user);

    return ResponseEntity.ok(new AuthResponseDto(UserResponseDto.from(user), token));
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
    return ResponseEntity.ok().build();
  }

  /** Documentação. */
  @GetMapping("/me")
  public ResponseEntity<UserResponseDto> me(Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.ok(UserResponseDto.from(user));
  }
}
