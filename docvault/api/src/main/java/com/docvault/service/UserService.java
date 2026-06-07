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
