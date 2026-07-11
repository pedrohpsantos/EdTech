package com.edtech.repository;

import com.edtech.model.VerificationToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

  Optional<VerificationToken> findByEmailAndToken(String email, String token);

  @Modifying
  @Transactional
  @Query("DELETE FROM VerificationToken t WHERE t.email = :email")
  void deleteByEmail(String email);
}
