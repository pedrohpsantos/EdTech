package com.edtech.config;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import java.io.IOException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.MDC;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

class RequestTracingFilterTest {

  private RequestTracingFilter filter;
  private FilterChain filterChain;

  @BeforeEach
  void setUp() {
    filter = new RequestTracingFilter();
    filterChain = mock(FilterChain.class);
  }

  @Test
  void doFilterInternal_WhenTraceIdIsMissing_ShouldGenerateOne()
      throws ServletException, IOException {
    MockHttpServletRequest request = new MockHttpServletRequest();
    MockHttpServletResponse response = new MockHttpServletResponse();

    filter.doFilterInternal(request, response, filterChain);

    assertNotNull(response.getHeader("X-Request-ID"));
    verify(filterChain, times(1)).doFilter(request, response);
    assertNull(MDC.get("traceId")); // Because it's removed in finally block
  }

  @Test
  void doFilterInternal_WhenTraceIdExists_ShouldUseExistingAndSanitize()
      throws ServletException, IOException {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.addHeader("X-Request-ID", "my-custom_trace*id-123");
    MockHttpServletResponse response = new MockHttpServletResponse();

    filter.doFilterInternal(request, response, filterChain);

    assertEquals("my-customtraceid-123", response.getHeader("X-Request-ID"));
    verify(filterChain, times(1)).doFilter(request, response);
  }

  @Test
  void doFilterInternal_WhenTraceIdIsEmpty_ShouldGenerateOne()
      throws ServletException, IOException {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.addHeader("X-Request-ID", "");
    MockHttpServletResponse response = new MockHttpServletResponse();

    filter.doFilterInternal(request, response, filterChain);

    assertNotNull(response.getHeader("X-Request-ID"));
    assertNotEquals("", response.getHeader("X-Request-ID"));
    verify(filterChain, times(1)).doFilter(request, response);
  }
}
