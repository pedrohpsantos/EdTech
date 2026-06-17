package com.edTech.repository;

import com.edTech.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DocumentRepository extends JpaRepository<Document, UUID> {
    
    @Query("SELECT d FROM Document d JOIN ProjectMember pm ON d.project.id = pm.project.id WHERE pm.user.id = :userId")
    List<Document> findDocumentsByUserId(@Param("userId") UUID userId);

    @Query("SELECT d FROM Document d JOIN ProjectMember pm ON d.project.id = pm.project.id WHERE pm.user.id = :userId " +
           "AND (:projectId IS NULL OR d.project.id = :projectId) " +
           "AND (:title IS NULL OR LOWER(d.title) LIKE LOWER(CONCAT('%', :title, '%')))")
    List<Document> findDocumentsByUserIdAndFilters(@Param("userId") UUID userId, @Param("projectId") UUID projectId, @Param("title") String title);
}
