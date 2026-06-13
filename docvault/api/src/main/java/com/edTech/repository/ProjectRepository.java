package com.edTech.repository;

import com.edTech.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
    
    @Query("SELECT p FROM Project p JOIN ProjectMember pm ON p.id = pm.project.id WHERE pm.user.id = :userId")
    List<Project> findProjectsByUserId(@Param("userId") UUID userId);
}
