package com.docvault.controller;

import com.docvault.dto.LoginRequest;
import com.docvault.dto.RegisterRequest;
import com.docvault.dto.UserResponse;
import com.docvault.model.User;
import com.docvault.service.JwtService;
import com.docvault.service.UserService;
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
    private final boolean secureCookie;
    private final long jwtExpirationMinutes;

    public AuthController(
            UserService userService,
            JwtService jwtService,
            @Value("${jwt.cookie-secure:false}") boolean secureCookie,
            @Value("${jwt.expiration-minutes:60}") long jwtExpirationMinutes
    ) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.secureCookie = secureCookie;
        this.jwtExpirationMinutes = jwtExpirationMinutes;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        User registeredUser = userService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.from(registeredUser));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody LoginRequest request) {
        User user = userService.authenticate(request.email(), request.password());
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok()
                .header("Set-Cookie", buildAuthCookie(token).toString())
                .body(UserResponse.from(user));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(UserResponse.from(user));
    }

    private ResponseCookie buildAuthCookie(String token) {
        return ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(secureCookie)
                .sameSite("Strict")
                .path("/")
                .maxAge(Duration.ofMinutes(jwtExpirationMinutes))
                .build();
    }
}
