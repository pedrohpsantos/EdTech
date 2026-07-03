package com.edTech.controller;

import com.edTech.dto.LoginRequestDTO;
import com.edTech.dto.RegisterRequestDTO;
import com.edTech.dto.UserResponseDTO;
import com.edTech.model.User;
import com.edTech.service.JwtService;
import com.edTech.service.UserService;
import com.edTech.service.RecoveryService;
import com.edTech.dto.RecoveryRequestDTO;
import com.edTech.dto.VerifyCodeDTO;
import com.edTech.dto.ResetPasswordDTO;
import jakarta.validation.Valid;
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

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final RecoveryService recoveryService;
    private final boolean secureCookie;
    private final long jwtExpirationMinutes;

    public AuthController(
            UserService userService,
            JwtService jwtService,
            RecoveryService recoveryService,
            @Value("${jwt.cookie-secure:false}") boolean secureCookie,
            @Value("${jwt.expiration-minutes:60}") long jwtExpirationMinutes
    ) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.recoveryService = recoveryService;
        this.secureCookie = secureCookie;
        this.jwtExpirationMinutes = jwtExpirationMinutes;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO request) {
        User registeredUser = userService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponseDTO.from(registeredUser));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        User user = userService.authenticate(request.email(), request.password());
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok()
                .header("Set-Cookie", buildAuthCookie(token).toString())
                .body(UserResponseDTO.from(user));
    }

    @PostMapping("/recovery/request")
    public ResponseEntity<?> requestRecovery(@RequestBody RecoveryRequestDTO request) {
        recoveryService.requestRecovery(request.email());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/recovery/verify")
    public ResponseEntity<?> verifyCode(@RequestBody VerifyCodeDTO request) {
        boolean valid = recoveryService.verifyCode(request.email(), request.code());
        if (valid) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("Código inválido ou expirado.");
    }

    @PostMapping("/recovery/reset")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO request) {
        boolean success = recoveryService.resetPassword(request.email(), request.code(), request.newPassword());
        if (success) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("Erro ao redefinir a senha.");
    }


    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        ResponseCookie clearedCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(secureCookie)
                .sameSite("None")
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", clearedCookie.toString())
                .build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> me(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(UserResponseDTO.from(user));
    }

    private ResponseCookie buildAuthCookie(String token) {
        return ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(secureCookie)
                .sameSite("None")
                .path("/")
                .maxAge(Duration.ofMinutes(jwtExpirationMinutes))
                .build();
    }
}
