package com.edtech.service;

import com.edtech.model.RecoveryToken;
import com.edtech.model.User;
import com.edtech.repository.RecoveryTokenRepository;
import com.edtech.repository.UserRepository;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Documentação para RecoveryService. */
@Service
public class RecoveryService {

  private static final SecureRandom SECURE_RANDOM = new SecureRandom();

  private final UserRepository userRepository;
  private final RecoveryTokenRepository recoveryTokenRepository;
  private final EmailService emailService;
  private final PasswordEncoder passwordEncoder;

  /** Documentação. */
  public RecoveryService(
      UserRepository userRepository,
      RecoveryTokenRepository recoveryTokenRepository,
      EmailService emailService,
      PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.recoveryTokenRepository = recoveryTokenRepository;
    this.emailService = emailService;
    this.passwordEncoder = passwordEncoder;
  }

  /** Documentação. */
  @Transactional
  public void requestRecovery(String email) {
    String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
    Optional<User> userOpt = userRepository.findByEmailIgnoreCase(normalizedEmail);

    // Demo accounts cannot recover password
    if (normalizedEmail.endsWith(".demo@unb.br")) {
      return;
    }

    // Sempre retorna sucesso rapidamente por seguranca (evitar email enumeration),
    // mas soh envia se
    // existir
    if (userOpt.isPresent()) {
      recoveryTokenRepository.deleteByEmail(normalizedEmail); // Limpa tokens antigos

      String code = String.format("%06d", SECURE_RANDOM.nextInt(999999));
      RecoveryToken token = new RecoveryToken(code, normalizedEmail, LocalDateTime.now().plusMinutes(15));
      recoveryTokenRepository.save(token);

      emailService.sendRecoveryEmail(normalizedEmail, code);
    }
  }

  /** Documentação. */
  @Transactional(readOnly = true)
  public boolean verifyCode(String email, String code) {
    String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
    Optional<RecoveryToken> tokenOpt = recoveryTokenRepository.findByEmailAndToken(normalizedEmail, code);

    if (tokenOpt.isPresent() && !tokenOpt.get().isExpired()) {
      return true;
    }
    return false;
  }

  /** Documentação. */
  @Transactional
  public boolean resetPassword(String email, String code, String newPassword) {
    String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);

    // Demo accounts cannot reset password
    if (normalizedEmail.endsWith(".demo@unb.br")) {
      return false;
    }

    Optional<RecoveryToken> tokenOpt = recoveryTokenRepository.findByEmailAndToken(normalizedEmail, code);

    if (tokenOpt.isPresent() && !tokenOpt.get().isExpired()) {
      Optional<User> userOpt = userRepository.findByEmailIgnoreCase(normalizedEmail);
      if (userOpt.isPresent()) {
        User user = userOpt.get();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        recoveryTokenRepository.deleteByEmail(normalizedEmail);
        return true;
      }
    }
    return false;
  }
}
