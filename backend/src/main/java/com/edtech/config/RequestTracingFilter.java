package com.edtech.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/** Javadoc. */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RequestTracingFilter extends OncePerRequestFilter {

  private static final String TRACE_ID_HEADER = "X-Request-ID";
  private static final String MDC_TRACE_ID_KEY = "traceId";

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      String traceId = request.getHeader(TRACE_ID_HEADER);
      if (traceId == null || traceId.isEmpty()) {
        traceId = UUID.randomUUID().toString();
      }

      MDC.put(MDC_TRACE_ID_KEY, traceId);
      // Sanitize before echoing back as HTTP header to prevent header injection (HRS)
      String safeTraceId = traceId.replaceAll("[^a-zA-Z0-9\\-]", "");
      response.setHeader(TRACE_ID_HEADER, safeTraceId);

      filterChain.doFilter(request, response);
    } finally {
      MDC.remove(MDC_TRACE_ID_KEY);
    }
  }
}
