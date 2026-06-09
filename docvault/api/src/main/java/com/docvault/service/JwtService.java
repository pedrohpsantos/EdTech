package com.docvault.service;

import com.docvault.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private static final String SECRET_KEY = "sua_chave_secreta_muito_longa_e_segura_para_o_jwt_edtech";
    private static final long EXPIRATION_TIME = 86400000; // 24 horas

    public String generateToken(User user) {
        return io.jsonwebtoken.Jwts.builder()
                .subject(user.getEmail())
                .claim("id", user.getId())
                .issuedAt(new java.util.Date())
                .expiration(new java.util.Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(io.jsonwebtoken.security.Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .compact();
    }

    public Claims validateToken(String token) {
        try {
           return io.jsonwebtoken.Jwts.parser()
                    .verifyWith(io.jsonwebtoken.security.Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token expirado");
        }
        catch (SignatureException e) {
            throw new RuntimeException("Assinatura inválida");
        }
        catch (MalformedJwtException e) {
            throw new RuntimeException("Token malformado");
        }

    }


    public Long getUserIdFromToken(String token) {
        return io.jsonwebtoken.Jwts.parser()
                .verifyWith(io.jsonwebtoken.security.Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("id", Long.class);
    }

}
