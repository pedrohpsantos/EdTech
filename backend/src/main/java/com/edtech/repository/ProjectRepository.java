package com.edtech.repository;

import com.edtech.model.Project;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/** Documentação para ProjectRepository. */
public interface ProjectRepository extends JpaRepository<Project, UUID> {

  @Query(
      "SELECT p FROM Project p JOIN ProjectMember pm ON p.id = pm.project.id "
          + "WHERE pm.user.id = :userId")
  org.springframework.data.domain.Page<Project> findProjectsByUserId(@Param("userId") UUID userId, org.springframework.data.domain.Pageable pageable);
}
