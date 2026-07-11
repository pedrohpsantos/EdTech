package com.edtech.repository;

import com.edtech.model.DocumentComment;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/** Javadoc. */
@Repository
public interface DocumentCommentRepository extends JpaRepository<DocumentComment, UUID> {

  @Query(
      "SELECT c FROM DocumentComment c JOIN FETCH c.author "
          + "WHERE c.document.id = :documentId ORDER BY c.createdAt ASC")
  List<DocumentComment> findByDocumentIdOrderByCreatedAtAsc(UUID documentId);
}
