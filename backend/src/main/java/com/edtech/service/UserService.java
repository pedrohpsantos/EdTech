package com.edtech.service;

import com.edtech.dto.RegisterRequestDto;
import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.UserRepository;
import java.util.Arrays;
import java.util.Locale;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Documentação para UserService. */
@Service
public class UserService {

  @Value("${institutional-email.allowed-domains:unb.br}")
  private String allowedInstitutionalDomains = "unb.br";

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final com.edtech.repository.VerificationTokenRepository verificationTokenRepository;
  private final EmailService emailService;
  private static final java.security.SecureRandom SECURE_RANDOM = new java.security.SecureRandom();

  /** Documentação para o método UserService. */
  public UserService(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      com.edtech.repository.VerificationTokenRepository verificationTokenRepository,
      EmailService emailService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.verificationTokenRepository = verificationTokenRepository;
    this.emailService = emailService;
  }

  /** Documentação. */
  @Transactional(readOnly = true)
  public User authenticate(String email, String password) {
    String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
    User user = userRepository
        .findByEmailIgnoreCase(normalizedEmail)
        .orElseThrow(() -> new InvalidCredentialsException("Credenciais inválidas."));

    if (!user.isActive()) {
      throw new AccountNotVerifiedException();
    }

    if (!passwordEncoder.matches(password, user.getPasswordHash())) {
      throw new InvalidCredentialsException("Credenciais inválidas.");
    }

    return user;
  }

  /** Documentação. */
  @Transactional
  public User register(RegisterRequestDto request) {
    String normalizedEmail = request.email().trim().toLowerCase(Locale.ROOT);

    if (!hasAllowedInstitutionalDomain(normalizedEmail)) {
      throw new InvalidInstitutionalEmailException(
          "O e-mail deve pertencer a um domínio institucional permitido.");
    }

    if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
      throw new DuplicateEmailException("E-mail ja cadastrado.");
    }

    UserRole initialRole = request.role();

    User user = new User(
        request.name().trim(),
        normalizedEmail,
        passwordEncoder.encode(request.password()),
        initialRole,
        java.util.UUID.fromString("00000000-0000-0000-0000-000000000001"));

    user.setActive(false);
    userRepository.save(user);

    verificationTokenRepository.deleteByEmail(normalizedEmail);
    String code = String.format("%06d", SECURE_RANDOM.nextInt(999999));
    com.edtech.model.VerificationToken token = new com.edtech.model.VerificationToken(
        code, normalizedEmail, java.time.LocalDateTime.now().plusMinutes(15));
    verificationTokenRepository.save(token);

    emailService.sendVerificationEmail(normalizedEmail, code);

    return user;
  }

  /**
   * Checks whether an email belongs to one of the configured institutional
   * domains.
   */
  private boolean hasAllowedInstitutionalDomain(String email) {
    return Arrays.stream(allowedInstitutionalDomains.split(","))
        .map(domain -> domain.trim().toLowerCase(Locale.ROOT))
        .filter(domain -> !domain.isBlank())
        .anyMatch(domain -> email.endsWith("@" + domain) || email.endsWith("." + domain));
  }

  /** Documentação. */
  @Transactional
  public User verifyRegistration(String email, String code) {
    String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
    Optional<com.edtech.model.VerificationToken> tokenOpt = verificationTokenRepository
        .findByEmailAndToken(normalizedEmail, code);

    if (tokenOpt.isPresent() && !tokenOpt.get().isExpired()) {
      Optional<User> userOpt = userRepository.findByEmailIgnoreCase(normalizedEmail);
      if (userOpt.isPresent()) {
        User user = userOpt.get();
        user.setActive(true);
        userRepository.save(user);
        verificationTokenRepository.deleteByEmail(normalizedEmail);
        return user;
      }
    }
    throw new InvalidCredentialsException("Código inválido ou expirado.");
  }

  /** Generates and sends a fresh verification code for an inactive account. */
  @Transactional
  public void resendVerificationCode(String email) {
    String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
    User user = userRepository
        .findByEmailIgnoreCase(normalizedEmail)
        .orElseThrow(() -> new InvalidCredentialsException("Credenciais inválidas."));
    if (user.isActive()) {
      return;
    }
    verificationTokenRepository.deleteByEmail(normalizedEmail);
    String code = String.format("%06d", SECURE_RANDOM.nextInt(999999));
    verificationTokenRepository.save(
        new com.edtech.model.VerificationToken(
            code, normalizedEmail, java.time.LocalDateTime.now().plusMinutes(15)));
    emailService.sendVerificationEmail(normalizedEmail, code);
  }

  @Transactional
  public User saveUserWithoutHash(User user) {
    return userRepository.save(user);
  }
}
