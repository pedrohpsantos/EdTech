package com.edtech.security;

import static org.mockito.Mockito.*;

import io.github.bucket4j.Bucket;
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
  private RateLimitingService rateLimitingService;
  private HttpServletRequest request;
  private HttpServletResponse response;
  private FilterChain filterChain;
  private StringWriter stringWriter;

  @BeforeEach
  void setUp() throws IOException {
    rateLimitingService = mock(RateLimitingService.class);
    rateLimitFilter = new RateLimitFilter(rateLimitingService);
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
    Bucket mockBucket = mock(Bucket.class);
    when(mockBucket.tryConsume(1)).thenReturn(true);
    when(rateLimitingService.resolveBucket("127.0.0.1")).thenReturn(mockBucket);

    rateLimitFilter.doFilterInternal(request, response, filterChain);

    verify(filterChain, times(1)).doFilter(request, response);
  }

  @Test
  void doFilterInternal_BlockedAfterLimit() throws ServletException, IOException {
    when(request.getRequestURI()).thenReturn("/api/auth/login");
    when(request.getRemoteAddr()).thenReturn("127.0.0.2");
    Bucket mockBucket = mock(Bucket.class);
    when(mockBucket.tryConsume(1)).thenReturn(false);
    when(rateLimitingService.resolveBucket("127.0.0.2")).thenReturn(mockBucket);

    rateLimitFilter.doFilterInternal(request, response, filterChain);

    verify(response).setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
  }
}
