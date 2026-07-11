package com.edtech.config;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.AuthenticationException;

class JwtAuthenticationEntryPointTest {

  @Test
  void testCommence() throws IOException {
    JwtAuthenticationEntryPoint entryPoint = new JwtAuthenticationEntryPoint();
    
    MockHttpServletRequest request = new MockHttpServletRequest();
    HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
    AuthenticationException authException = Mockito.mock(AuthenticationException.class);
    
    StringWriter stringWriter = new StringWriter();
    PrintWriter printWriter = new PrintWriter(stringWriter);
    Mockito.when(response.getWriter()).thenReturn(printWriter);
    
    entryPoint.commence(request, response, authException);
    
    Mockito.verify(response).setStatus(HttpStatus.UNAUTHORIZED.value());
    Mockito.verify(response).setContentType(MediaType.APPLICATION_JSON_VALUE);
    
    String responseBody = stringWriter.toString();
    // Validate that it returns a valid JSON matching ErrorResponse
    ObjectMapper mapper = new ObjectMapper();
    var node = mapper.readTree(responseBody);
    assertEquals("unauthorized", node.get("code").asText());
    assertEquals("Autenticação necessária.", node.get("message").asText());
  }
}
