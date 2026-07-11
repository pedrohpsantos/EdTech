package com.edtech.config;

import com.edtech.model.User;
import com.edtech.repository.UserRepository;
import com.edtech.service.JwtService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/** Documentação para JwtAuthenticationFilter. */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserRepository userRepository;

  /** Documentação para o método JwtAuthenticationFilter. */
  public JwtAuthenticationFilter(JwtService jwtService, UserRepository userRepository) {
    this.jwtService = jwtService;
    this.userRepository = userRepository;
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String path = request.getServletPath();
    String method = request.getMethod();

    return HttpMethod.OPTIONS.matches(method)
        || (HttpMethod.POST.matches(method) && "/api/auth/login".equals(path))
        || (HttpMethod.POST.matches(method) && "/api/auth/register".equals(path))
        || path.startsWith("/api/auth/recovery/");
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    Optional<String> token = extractToken(request);

    if (token.isEmpty()) {
      filterChain.doFilter(request, response);
      return;
    }

    try {
      String email = jwtService.extractSubject(token.get());
      if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        userRepository
            .findByEmailIgnoreCase(email)
            .filter(User::isActive)
            .filter(user -> jwtService.isValid(token.get(), user))
            .ifPresent(user -> authenticateUser(request, user));
      }
    } catch (JwtException | IllegalArgumentException exception) {
      SecurityContextHolder.clearContext();
    }

    filterChain.doFilter(request, response);
  }

  private Optional<String> extractToken(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      return Optional.of(authHeader.substring(7));
    }

    return Optional.empty();
  }

  private void authenticateUser(HttpServletRequest request, User user) {
    var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
    var authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(authentication);
  }
}
