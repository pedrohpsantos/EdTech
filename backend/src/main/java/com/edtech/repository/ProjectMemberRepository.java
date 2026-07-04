package com.edtech.repository;

import com.edtech.model.ProjectMember;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/** Documentação para ProjectMemberRepository. */
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, UUID> {
  Optional<ProjectMember> findByProjectIdAndUserId(UUID projectId, UUID userId);
}
