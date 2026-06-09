package com.docvault.service;

import com.docvault.dto.RegisterRequest;
import com.docvault.model.User;
import com.docvault.model.UserRole;
import com.docvault.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class UserService {

    private static final String INSTITUTIONAL_DOMAIN = "@unb.br";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public User authenticate(String email, String password) {
        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
        User user = userRepository.findByEmailIgnoreCase(normalizedEmail)
                .filter(User::isActive)
                .orElseThrow(() -> new InvalidCredentialsException("Credenciais inválidas."));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new InvalidCredentialsException("Credenciais inválidas.");
        }

        return user;
    }

    @Transactional
    public User register(RegisterRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase(Locale.ROOT);

        if (!normalizedEmail.endsWith(INSTITUTIONAL_DOMAIN)) {
            throw new InvalidInstitutionalEmailException("O e-mail deve pertencer ao dominio @unb.br.");
        }

        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new DuplicateEmailException("E-mail ja cadastrado.");
        }

        User user = new User(
                request.name().trim(),
                normalizedEmail,
                passwordEncoder.encode(request.password()),
                UserRole.RESEARCHER
        );

        return userRepository.save(user);
    }
}
