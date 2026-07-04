package com.edtech.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/** Documentação para RateLimitFilter. */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

  private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

  private Bucket createNewBucket() {
    // Limit: 5 requests per minute
    Refill refill = Refill.intervally(5, Duration.ofMinutes(1));
    Bandwidth limit = Bandwidth.classic(5, refill);
    return Bucket.builder().addLimit(limit).build();
  }

  private Bucket resolveBucket(String clientIp) {
    return cache.computeIfAbsent(clientIp, k -> createNewBucket());
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    String path = request.getRequestURI();

    // Aplica o rate limit apenas para rotas de autenticacao e recuperacao
    if (path.startsWith("/api/auth/")) {
      String clientIp = request.getRemoteAddr();
      Bucket bucket = resolveBucket(clientIp);

      if (bucket.tryConsume(1)) {
        filterChain.doFilter(request, response);
      } else {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.getWriter().write("Too many requests. Please try again later.");
        return;
      }
    } else {
      filterChain.doFilter(request, response);
    }
  }
}
