package com.edtech.repository;

import com.edtech.model.Document;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/** Documentação para DocumentRepository. */
public interface DocumentRepository extends JpaRepository<Document, UUID> {

    @Query("SELECT d FROM Document d JOIN ProjectMember pm ON d.project.id = pm.project.id "
            + "WHERE pm.user.id = :userId")
    Page<Document> findDocumentsByUserId(@Param("userId") UUID userId, Pageable pageable);

    @Query("SELECT d FROM Document d JOIN ProjectMember pm ON d.project.id = pm.project.id "
            + "WHERE pm.user.id = :userId "
            + "AND (:projectId IS NULL OR d.project.id = :projectId) "
            + "AND (:title IS NULL OR LOWER(d.title) LIKE "
            + "LOWER(CONCAT('%', CAST(:title AS string), '%'))) "
            + "AND (:status IS NULL OR CAST(d.status AS string) = CAST(:status AS string))")
    Page<Document> findDocumentsByUserIdAndFilters(
            @Param("userId") UUID userId,
            @Param("projectId") UUID projectId,
            @Param("title") String title,
            @Param("status") com.edtech.model.DocumentStatus status,
            Pageable pageable);

    @Query("SELECT COUNT(d) FROM Document d JOIN ProjectMember pm ON d.project.id = pm.project.id "
            + "WHERE pm.user.id = :userId")
    long countDocumentsByUserId(@Param("userId") UUID userId);

    @Query("SELECT COUNT(d) FROM Document d JOIN ProjectMember pm ON d.project.id = pm.project.id "
            + "WHERE pm.user.id = :userId AND CAST(d.status AS string) = CAST(:status AS string)")
    long countDocumentsByUserIdAndStatus(
            @Param("userId") UUID userId, @Param("status") com.edtech.model.DocumentStatus status);
}
