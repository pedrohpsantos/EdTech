package com.edtech.service;

import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.UserRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LaboratoryTokenService {

  private final UserRepository userRepository;
  private final String serverSecret;

  public LaboratoryTokenService(
      UserRepository userRepository,
      @Value("${jwt.secret:default-secret-key-for-lab-token-12345}") String serverSecret) {
    this.userRepository = userRepository;
    this.serverSecret = serverSecret;
  }

  public String generateToken(UUID advisorId) {
    long currentWeek = System.currentTimeMillis() / (7L * 24 * 60 * 60 * 1000);
    String rawData = advisorId.toString() + ":" + currentWeek + ":" + serverSecret;
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hash = digest.digest(rawData.getBytes(StandardCharsets.UTF_8));

      // Extrai os 6 ultimos bytes para formar o TOTP
      int offset = hash[hash.length - 1] & 0xf;
      int binary =
          ((hash[offset] & 0x7f) << 24)
              | ((hash[offset + 1] & 0xff) << 16)
              | ((hash[offset + 2] & 0xff) << 8)
              | (hash[offset + 3] & 0xff);

      int otp = binary % 1000000;
      return String.format("%06d", otp);
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException("SHA-256 not found", e);
    }
  }

  public Optional<User> findAdvisorByToken(String token) {
    List<User> advisors = userRepository.findByRole(UserRole.ADVISOR);
    for (User advisor : advisors) {
      if (generateToken(advisor.getId()).equals(token)) {
        return Optional.of(advisor);
      }
    }
    return Optional.empty();
  }
}
