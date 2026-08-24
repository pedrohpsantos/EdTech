package com.edtech.config;

import com.edtech.dto.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/** Documentação para JwtAuthenticationEntryPoint. */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

  /** Documentação para o método JwtAuthenticationEntryPoint. */
  public JwtAuthenticationEntryPoint() {
  }

  @Override
  public void commence(
      HttpServletRequest request,
      HttpServletResponse response,
      AuthenticationException authException)
      throws IOException {
    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.writeValue(
        response.getWriter(), new ErrorResponse("unauthorized", "Autenticação necessária."));
  }
}
