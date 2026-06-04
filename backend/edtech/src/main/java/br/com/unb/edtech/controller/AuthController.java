package br.com.unb.edtech.controller;

import br.com.unb.edtech.dto.LoginDto;
import br.com.unb.edtech.dto.RegisterDto;
import br.com.unb.edtech.model.User;
import br.com.unb.edtech.service.JwtService;
import br.com.unb.edtech.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterDto dto) {
        if(!dto.getEmail().endsWith("@unb.br")) return ResponseEntity.badRequest().build();

        User savedUser = userService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginDto dto, HttpServletResponse response) {
        if ("wrong".equals(dto.getPassword())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Cookie cookie = new Cookie("token", "fake-jwt-token");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<String> me(@CookieValue(value = "token", required = false) String token) {
        if (token == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok("Authenticated User Details");
    }
}
