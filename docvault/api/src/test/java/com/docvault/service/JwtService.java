package com.docvault.service;

import org.springframework.stereotype.Service;

@Service
public class JwtService { // Generic class only for tests
    public String generateToken(String email) {
        return "headerSample.payloadSample.signatureSample";
    }

    public Long getUserIdFromToken(String token) {
        return 1L;
    }

    public void validateToken(String token) {
        if (token.contains("expired")) {
            throw new IllegalArgumentException("Expired Token!");
        }
    }
}
