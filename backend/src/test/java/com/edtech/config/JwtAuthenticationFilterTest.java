package com.edtech.config;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.UserRepository;
import com.edtech.service.JwtService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import java.io.IOException;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;

class JwtAuthenticationFilterTest {

  private JwtService jwtService;
  private UserRepository userRepository;
  private JwtAuthenticationFilter filter;

  @BeforeEach
  void setUp() {
    jwtService = mock(JwtService.class);
    userRepository = mock(UserRepository.class);
    filter = new JwtAuthenticationFilter(jwtService, userRepository);
    SecurityContextHolder.clearContext();
  }

  @Test
  void shouldNotFilterReturnsTrueForLogin() {
    MockHttpServletRequest request = new MockHttpServletRequest(HttpMethod.POST.name(), "/api/auth/login");
    request.setServletPath("/api/auth/login");
    assertThat(filter.shouldNotFilter(request)).isTrue();
  }

  @Test
  void shouldNotFilterReturnsTrueForRegister() {
    MockHttpServletRequest request = new MockHttpServletRequest(HttpMethod.POST.name(), "/api/auth/register");
    request.setServletPath("/api/auth/register");
    assertThat(filter.shouldNotFilter(request)).isTrue();
  }

  @Test
  void shouldNotFilterReturnsTrueForRecovery() {
    MockHttpServletRequest request = new MockHttpServletRequest(HttpMethod.GET.name(), "/api/auth/recovery/request");
    request.setServletPath("/api/auth/recovery/request");
    assertThat(filter.shouldNotFilter(request)).isTrue();
  }

  @Test
  void shouldNotFilterReturnsTrueForOptions() {
    MockHttpServletRequest request = new MockHttpServletRequest(HttpMethod.OPTIONS.name(), "/api/some-endpoint");
    request.setServletPath("/api/some-endpoint");
    assertThat(filter.shouldNotFilter(request)).isTrue();
  }

  @Test
  void shouldNotFilterReturnsFalseForOtherPaths() {
    MockHttpServletRequest request = new MockHttpServletRequest(HttpMethod.GET.name(), "/api/documents");
    request.setServletPath("/api/documents");
    assertThat(filter.shouldNotFilter(request)).isFalse();
  }

  @Test
  void doFilterInternalWithNoToken() throws ServletException, IOException {
    MockHttpServletRequest request = new MockHttpServletRequest();
    MockHttpServletResponse response = new MockHttpServletResponse();
    FilterChain filterChain = mock(FilterChain.class);

    filter.doFilterInternal(request, response, filterChain);

    verify(filterChain).doFilter(request, response);
    assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
  }

  @Test
  void doFilterInternalWithBearerToken() throws ServletException, IOException {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.addHeader("Authorization", "Bearer valid.token");
    MockHttpServletResponse response = new MockHttpServletResponse();
    FilterChain filterChain = mock(FilterChain.class);

    User user = new User("Test", "test@unb.br", "hash", UserRole.RESEARCHER, java.util.UUID.randomUUID());
    user.setActive(true);

    when(jwtService.extractSubject("valid.token")).thenReturn("test@unb.br");
    when(userRepository.findByEmailIgnoreCase("test@unb.br")).thenReturn(Optional.of(user));
    when(jwtService.isValid("valid.token", user)).thenReturn(true);

    filter.doFilterInternal(request, response, filterChain);

    verify(filterChain).doFilter(request, response);
    assertThat(SecurityContextHolder.getContext().getAuthentication()).isNotNull();
    User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    assertThat(principal.getEmail()).isEqualTo("test@unb.br");
  }

  @Test
  void doFilterInternalWithInvalidToken() throws ServletException, IOException {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.addHeader("Authorization", "Bearer invalid.token");
    MockHttpServletResponse response = new MockHttpServletResponse();
    FilterChain filterChain = mock(FilterChain.class);

    when(jwtService.extractSubject("invalid.token")).thenThrow(new JwtException("Invalid token"));

    filter.doFilterInternal(request, response, filterChain);

    verify(filterChain).doFilter(request, response);
    assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
  }

  @Test
  void doFilterInternalWithInactiveUser() throws ServletException, IOException {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.addHeader("Authorization", "Bearer valid.token");
    MockHttpServletResponse response = new MockHttpServletResponse();
    FilterChain filterChain = mock(FilterChain.class);

    User user = new User("Test", "test@unb.br", "hash", UserRole.RESEARCHER, java.util.UUID.randomUUID());
    user.setActive(false);

    when(jwtService.extractSubject("valid.token")).thenReturn("test@unb.br");
    when(userRepository.findByEmailIgnoreCase("test@unb.br")).thenReturn(Optional.of(user));

    filter.doFilterInternal(request, response, filterChain);

    verify(filterChain).doFilter(request, response);
    assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
  }

  @Test
  void doFilterInternalWithUserNotFound() throws ServletException, IOException {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.addHeader("Authorization", "Bearer valid.token");
    MockHttpServletResponse response = new MockHttpServletResponse();
    FilterChain filterChain = mock(FilterChain.class);

    when(jwtService.extractSubject("valid.token")).thenReturn("test@unb.br");
    when(userRepository.findByEmailIgnoreCase("test@unb.br")).thenReturn(Optional.empty());

    filter.doFilterInternal(request, response, filterChain);

    verify(filterChain).doFilter(request, response);
    assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
  }
}
