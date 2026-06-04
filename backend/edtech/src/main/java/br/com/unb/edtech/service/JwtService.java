package br.com.unb.edtech.service;

import org.springframework.stereotype.Service;

@Service
public class JwtService {
    public String generateToken(String email) {
        return "headerSample.payloadSample.signatureSample";
    }

    public Long getUserIdFromToken(String token) {
        return 1L;
    }

    public boolean validateToken(String token) {
        if (token.contains("expired")) {
            throw new IllegalArgumentException("Expired Token!");
        }
        return true;
    }
}
