package com.edTech.repository;

import com.edTech.model.RecoveryToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecoveryTokenRepository extends JpaRepository<RecoveryToken, Long> {
  Optional<RecoveryToken> findByEmailAndToken(String email, String token);

  void deleteByEmail(String email);
}
