package com.edtech.service;

import com.edtech.dto.RegisterRequestDto;
import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.UserRepository;
import java.util.Locale;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Documentação para UserService. */
@Service
public class UserService {

  private static final String INSTITUTIONAL_DOMAIN = "@unb.br";

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  /** Documentação para o método UserService. */
  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  /** Documentação. */
  @Transactional(readOnly = true)
  public User authenticate(String email, String password) {
    String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
    User user =
        userRepository
            .findByEmailIgnoreCase(normalizedEmail)
            .filter(User::isActive)
            .orElseThrow(() -> new InvalidCredentialsException("Credenciais inválidas."));

    if (!passwordEncoder.matches(password, user.getPasswordHash())) {
      throw new InvalidCredentialsException("Credenciais inválidas.");
    }

    boolean roleChanged = false;
    if (normalizedEmail.contains("auditor") && user.getRole() != UserRole.AUDITOR) {
      user.setRole(UserRole.AUDITOR);
      roleChanged = true;
    } else if ((normalizedEmail.contains("orientador") || normalizedEmail.contains("advisor")) && user.getRole() != UserRole.ADVISOR) {
      user.setRole(UserRole.ADVISOR);
      roleChanged = true;
    }

    if (roleChanged) {
      userRepository.save(user);
    }

    return user;
  }

  /** Documentação. */
  @Transactional
  public User register(RegisterRequestDto request) {
    String normalizedEmail = request.email().trim().toLowerCase(Locale.ROOT);

    if (!normalizedEmail.endsWith("@unb.br") && !normalizedEmail.endsWith(".unb.br")) {
      throw new InvalidInstitutionalEmailException("O e-mail deve pertencer ao dominio unb.br.");
    }

    if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
      throw new DuplicateEmailException("E-mail ja cadastrado.");
    }

    UserRole initialRole = UserRole.RESEARCHER;
    if (normalizedEmail.contains("auditor")) {
      initialRole = UserRole.AUDITOR;
    } else if (normalizedEmail.contains("orientador") || normalizedEmail.contains("advisor")) {
      initialRole = UserRole.ADVISOR;
    }

    User user =
        new User(
            request.name().trim(),
            normalizedEmail,
            passwordEncoder.encode(request.password()),
            initialRole);

    return userRepository.save(user);
  }
}
