package com.edtech.security;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class RateLimitFilterTest {

  private RateLimitFilter rateLimitFilter;
  private HttpServletRequest request;
  private HttpServletResponse response;
  private FilterChain filterChain;
  private StringWriter stringWriter;

  @BeforeEach
  void setUp() throws IOException {
    rateLimitFilter = new RateLimitFilter();
    request = mock(HttpServletRequest.class);
    response = mock(HttpServletResponse.class);
    filterChain = mock(FilterChain.class);
    stringWriter = new StringWriter();
    when(response.getWriter()).thenReturn(new PrintWriter(stringWriter));
  }

  @Test
  void doFilterInternal_AllowedForNonAuthRoutes() throws ServletException, IOException {
    when(request.getRequestURI()).thenReturn("/api/projects");

    rateLimitFilter.doFilterInternal(request, response, filterChain);

    verify(filterChain, times(1)).doFilter(request, response);
  }

  @Test
  void doFilterInternal_AllowedForAuthRoutes() throws ServletException, IOException {
    when(request.getRequestURI()).thenReturn("/api/auth/login");
    when(request.getRemoteAddr()).thenReturn("127.0.0.1");

    rateLimitFilter.doFilterInternal(request, response, filterChain);

    verify(filterChain, times(1)).doFilter(request, response);
  }

  @Test
  void doFilterInternal_BlockedAfterLimit() throws ServletException, IOException {
    when(request.getRequestURI()).thenReturn("/api/auth/login");
    when(request.getRemoteAddr()).thenReturn("127.0.0.2");

    for (int i = 0; i < 5; i++) {
      rateLimitFilter.doFilterInternal(request, response, filterChain);
    }

    verify(filterChain, times(5)).doFilter(request, response);

    rateLimitFilter.doFilterInternal(request, response, filterChain);

    verify(response).setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
    assertTrue(stringWriter.toString().contains("Too many requests"));
  }
}
