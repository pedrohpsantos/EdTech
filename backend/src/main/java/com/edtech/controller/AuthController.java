package com.edtech.controller;

import com.edtech.dto.AuthResponseDto;
import com.edtech.dto.LoginRequestDto;
import com.edtech.dto.RecoveryRequestDto;
import com.edtech.dto.RegisterRequestDto;
import com.edtech.dto.ResetPasswordDto;
import com.edtech.dto.UpdateProfileRequestDto;
import com.edtech.dto.UserResponseDto;
import com.edtech.dto.VerifyCodeDto;
import com.edtech.exception.RateLimitExceededException;
import com.edtech.model.User;
import com.edtech.security.RateLimitingService;
import com.edtech.service.JwtService;
import com.edtech.service.RecoveryService;
import com.edtech.service.TwoFactorAuthService;
import com.edtech.service.UserService;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
  private final TwoFactorAuthService twoFactorAuthService;

  /** Documentação. */
  public AuthController(
      UserService userService,
      JwtService jwtService,
      RecoveryService recoveryService,
      RateLimitingService rateLimitingService,
      TwoFactorAuthService twoFactorAuthService) {
    this.userService = userService;
    this.jwtService = jwtService;
    this.recoveryService = recoveryService;
    this.rateLimitingService = rateLimitingService;
    this.twoFactorAuthService = twoFactorAuthService;
  }

  /** Documentação. */
  @PostMapping("/register")
  public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequestDto request) {
    userService.register(request);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  /** Documentação. */
  @PostMapping("/register/verify")
  public ResponseEntity<AuthResponseDto> verifyRegistration(@RequestBody VerifyCodeDto request) {
    User user = userService.verifyRegistration(request.email(), request.code());
    String token = jwtService.generateToken(user);

    org.springframework.http.ResponseCookie cookie =
        org.springframework.http.ResponseCookie.from("jwt", token)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(24 * 60 * 60)
            .sameSite("None")
            .build();

    return ResponseEntity.ok()
        .header(org.springframework.http.HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new AuthResponseDto(UserResponseDto.from(user), null));
  }

  /** Documentacao. */
  @PostMapping("/register/resend")
  public ResponseEntity<Void> resendRegistrationCode(@Valid @RequestBody VerifyCodeDto request) {
    if (request.email() == null
        || !request.email().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
      throw new IllegalArgumentException("Invalid email format");
    }
    userService.resendVerificationCode(request.email());
    return ResponseEntity.noContent().build();
  }

  /** Documentação. */
  @PostMapping("/login")
  public ResponseEntity<?> login(
      @Valid @RequestBody LoginRequestDto request, HttpServletRequest httpRequest) {
    Bucket bucket = rateLimitingService.resolveBucket(httpRequest.getRemoteAddr());
    if (!bucket.tryConsume(1)) {
      throw new RateLimitExceededException(
          "Limite de tentativas excedido. Tente novamente mais tarde.");
    }

    User user = userService.authenticate(request.email(), request.password());

    if (user.isMfaEnabled()) {
      return ResponseEntity.status(HttpStatus.ACCEPTED)
          .body(Map.of("mfaRequired", true, "email", user.getEmail()));
    }

    String token = jwtService.generateToken(user);

    org.springframework.http.ResponseCookie cookie =
        org.springframework.http.ResponseCookie.from("jwt", token)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(24 * 60 * 60)
            .sameSite("None")
            .build();

    return ResponseEntity.ok()
        .header(org.springframework.http.HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new AuthResponseDto(UserResponseDto.from(user), null));
  }

  /** Javadoc. */
  @PostMapping("/login/verify-2fa")
  public ResponseEntity<?> verify2FaLogin(
      @Valid @RequestBody com.edtech.dto.Verify2FaLoginDto request,
      HttpServletRequest httpRequest) {
    Bucket bucket = rateLimitingService.resolveBucket(httpRequest.getRemoteAddr());
    if (!bucket.tryConsume(1)) {
      throw new RateLimitExceededException(
          "Limite de tentativas excedido. Tente novamente mais tarde.");
    }

    User user = userService.authenticate(request.email(), request.password());
    if (!user.isMfaEnabled()) {
      return ResponseEntity.badRequest().body("2FA is not enabled for this user.");
    }

    boolean isValid = twoFactorAuthService.verifyCode(user.getMfaSecret(), request.code());
    if (!isValid) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid 2FA code.");
    }

    String token = jwtService.generateToken(user);

    org.springframework.http.ResponseCookie cookie =
        org.springframework.http.ResponseCookie.from("jwt", token)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(24 * 60 * 60)
            .sameSite("None")
            .build();

    return ResponseEntity.ok()
        .header(org.springframework.http.HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new AuthResponseDto(UserResponseDto.from(user), null));
  }

  /** Javadoc. */
  @GetMapping("/2fa/setup")
  public ResponseEntity<?> setup2Fa(Authentication authentication) {
    User user = (User) authentication.getPrincipal();

    if (user.isMfaEnabled()) {
      return ResponseEntity.badRequest().body("2FA is already enabled.");
    }

    String secret = user.getMfaSecret();
    if (secret == null || secret.isEmpty()) {
      secret = twoFactorAuthService.generateSecret();
      user.setMfaSecret(secret);
      userService.saveUserWithoutHash(
          user); // Wait, we need a method to save the user without rehashing
    }

    try {
      String qrCodeUri = twoFactorAuthService.getQrCodeImageUri(secret, user.getEmail());
      return ResponseEntity.ok(Map.of("secret", secret, "qrCodeUri", qrCodeUri));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Failed to generate QR Code");
    }
  }

  /** Javadoc. */
  @PostMapping("/2fa/enable")
  public ResponseEntity<?> enable2Fa(
      @RequestBody VerifyCodeDto request, Authentication authentication) {
    User user = (User) authentication.getPrincipal();

    if (user.isMfaEnabled()) {
      return ResponseEntity.badRequest().body("2FA is already enabled.");
    }

    boolean isValid = twoFactorAuthService.verifyCode(user.getMfaSecret(), request.code());
    if (!isValid) {
      return ResponseEntity.badRequest().body("Invalid 2FA code.");
    }

    user.setMfaEnabled(true);
    userService.saveUserWithoutHash(user);
    return ResponseEntity.ok().build();
  }

  /** Documentação. */
  @PostMapping("/recovery/request")
  public ResponseEntity<?> requestRecovery(
      @Valid @RequestBody RecoveryRequestDto request, HttpServletRequest httpRequest) {
    Bucket bucket = rateLimitingService.resolveBucket(httpRequest.getRemoteAddr());
    if (!bucket.tryConsume(1)) {
      throw new RateLimitExceededException(
          "Limite de tentativas excedido. Tente novamente mais tarde.");
    }

    if (request.email() == null
        || !request.email().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
      throw new IllegalArgumentException("Invalid email format");
    }
    recoveryService.requestRecovery(request.email());
    return ResponseEntity.ok().build();
  }

  /** Documentação. */
  @PostMapping("/recovery/verify")
  public ResponseEntity<?> verifyCode(@Valid @RequestBody VerifyCodeDto request) {
    boolean valid = recoveryService.verifyCode(request.email(), request.code());
    if (valid) {
      return ResponseEntity.ok().build();
    }
    return ResponseEntity.badRequest().body("Código inválido ou expirado.");
  }

  /** Documentação. */
  @PostMapping("/recovery/reset")
  public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordDto request) {
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
    org.springframework.http.ResponseCookie cookie =
        org.springframework.http.ResponseCookie.from("jwt", "")
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(0)
            .sameSite("None")
            .build();
    return ResponseEntity.ok()
        .header(org.springframework.http.HttpHeaders.SET_COOKIE, cookie.toString())
        .build();
  }

  /** Documentação. */
  @GetMapping("/me")
  public ResponseEntity<UserResponseDto> me(Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.ok(UserResponseDto.from(user));
  }

  /** Atualiza os dados de apresentação da conta autenticada. */
  @PatchMapping("/me")
  public ResponseEntity<UserResponseDto> updateProfile(
      @Valid @RequestBody UpdateProfileRequestDto request, Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    user.setName(request.name().trim());
    user.setAvatarUrl(request.avatarUrl());
    return ResponseEntity.ok(UserResponseDto.from(userService.saveUserWithoutHash(user)));
  }
}
