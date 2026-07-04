package com.edtech.repository;

import com.edtech.model.AuditLog;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/** Documentação para AuditLogRepository. */
@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {
  // entender o que estou fazendo
}
