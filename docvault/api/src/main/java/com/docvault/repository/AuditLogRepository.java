package com.docvault.repository;

import com.docvault.model.AuditLog;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {
    // entender o que estou fazendo
}
