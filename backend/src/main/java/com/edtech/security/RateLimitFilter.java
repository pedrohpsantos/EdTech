package com.edtech.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/** Rate limit filter para rotas de autenticação. */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

  private final RateLimitingService rateLimitingService;
  private final ObjectMapper objectMapper = new ObjectMapper();

  public RateLimitFilter(RateLimitingService rateLimitingService) {
    this.rateLimitingService = rateLimitingService;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    String path = request.getRequestURI();

    if (path.startsWith("/api/auth/")) {
      String clientIp = request.getRemoteAddr();
      io.github.bucket4j.Bucket bucket = rateLimitingService.resolveBucket(clientIp);

      if (bucket.tryConsume(1)) {
        filterChain.doFilter(request, response);
      } else {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(
            response.getWriter(),
            Map.of("error", "Limite de tentativas excedido. Tente novamente mais tarde."));
      }
    } else {
      filterChain.doFilter(request, response);
    }
  }
}
