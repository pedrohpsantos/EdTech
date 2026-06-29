package com.edTech.service;

import com.edTech.model.RecoveryToken;
import com.edTech.model.User;
import com.edTech.repository.RecoveryTokenRepository;
import com.edTech.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;
import java.security.SecureRandom;

@Service
public class RecoveryService {

    private final UserRepository userRepository;
    private final RecoveryTokenRepository recoveryTokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public RecoveryService(UserRepository userRepository,
                           RecoveryTokenRepository recoveryTokenRepository,
                           EmailService emailService,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.recoveryTokenRepository = recoveryTokenRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void requestRecovery(String email) {
        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(normalizedEmail);
        
        // Sempre retorna sucesso rapidamente por seguranca (evitar email enumeration), mas soh envia se existir
        if (userOpt.isPresent()) {
            recoveryTokenRepository.deleteByEmail(normalizedEmail); // Limpa tokens antigos
            
            String code = String.format("%06d", new SecureRandom().nextInt(999999));
            RecoveryToken token = new RecoveryToken(code, normalizedEmail, LocalDateTime.now().plusMinutes(15));
            recoveryTokenRepository.save(token);
            
            emailService.sendRecoveryEmail(normalizedEmail, code);
        }
    }

    @Transactional(readOnly = true)
    public boolean verifyCode(String email, String code) {
        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
        Optional<RecoveryToken> tokenOpt = recoveryTokenRepository.findByEmailAndToken(normalizedEmail, code);
        
        if (tokenOpt.isPresent() && !tokenOpt.get().isExpired()) {
            return true;
        }
        return false;
    }

    @Transactional
    public boolean resetPassword(String email, String code, String newPassword) {
        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
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
