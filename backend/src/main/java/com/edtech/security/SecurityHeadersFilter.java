package com.edtech.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/** Javadoc. */
@Component
@Order(org.springframework.core.Ordered.HIGHEST_PRECEDENCE)
public class SecurityHeadersFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    response.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("X-Frame-Options", "DENY");
    response.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
    response.setHeader("Cache-Control", "no-store");

    String requestId = request.getHeader("X-Request-ID");
    if (requestId != null) {
      String sanitized = requestId.replaceAll("[\r\n]", "");
      response.setHeader("X-Request-ID", sanitized);
    }

    filterChain.doFilter(request, response);
  }
}
