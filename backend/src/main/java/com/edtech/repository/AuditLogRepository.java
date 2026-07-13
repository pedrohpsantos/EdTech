package com.edtech.repository;

import com.edtech.model.AuditLog;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/** Documentacao para AuditLogRepository. */
@Repository
public interface AuditLogRepository
    extends JpaRepository<AuditLog, UUID>, JpaSpecificationExecutor<AuditLog> {
  List<AuditLog> findAllByOrderByCreatedAtDesc();

  List<AuditLog> findByResourceTypeAndResourceIdOrderByCreatedAtAsc(
      String resourceType, UUID resourceId);
}
