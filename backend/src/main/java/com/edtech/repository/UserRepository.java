package com.edtech.repository;

import com.edtech.model.User;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/** Documentação para UserRepository. */
public interface UserRepository extends JpaRepository<User, UUID> {

  boolean existsByEmailIgnoreCase(String email);

  Optional<User> findByEmailIgnoreCase(String email);

  Optional<User> findByEmail(String email);

  java.util.List<User> findByRole(com.edtech.model.UserRole role);
}
