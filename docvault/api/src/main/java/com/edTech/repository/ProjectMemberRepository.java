package com.edTech.repository;

import com.edTech.model.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, UUID> {
    Optional<ProjectMember> findByProjectIdAndUserId(UUID projectId, UUID userId);
}
