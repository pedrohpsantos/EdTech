package com.docvault.controller;

import com.docvault.dto.ErrorResponse;
import com.docvault.dto.RegisterRequest;
import com.docvault.dto.UserResponse;
import com.docvault.model.User;
import com.docvault.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        User registeredUser = userService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.from(registeredUser));
    }
}
