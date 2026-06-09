package com.docvault.service;

import com.docvault.dto.LoginRequestDTO;
import com.docvault.dto.RegisterRequestDTO;
import com.docvault.model.User;
import com.docvault.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User register(RegisterRequestDTO request){
        if (!request.getEmail().endsWith("@unb.br")){
            throw new IllegalArgumentException("Email deve pertencer ao domínio unb.br");
        }
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }
        User newUser = new User(request.getName(), request.getEmail(), passwordEncoder.encode(request.getPassword()), "USER", true);
        return userRepository.save(newUser);
    }
    public User authenticate(LoginRequestDTO request){
        User user = findByEmail(request.email());
        if(!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Senha incorreta");
        }
        return user;
    }



    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
}
