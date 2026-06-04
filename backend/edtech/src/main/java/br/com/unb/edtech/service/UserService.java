package br.com.unb.edtech.service;

import br.com.unb.edtech.dto.RegisterDto;
import br.com.unb.edtech.model.User;
import br.com.unb.edtech.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterDto dto) {
        if (!dto.getEmail().endsWith("@unb.br")) throw new IllegalArgumentException("Invalid domain!");
        if (userRepository.existsByEmail(dto.getEmail())) throw new IllegalArgumentException("E-mail already registered");

        return userRepository.save(User.builder()
                .id(1L)
                .name(dto.getName())
                .email(dto.getEmail())
                .build());
    }
}
