package com.edtech.repository;

import com.edtech.model.AuditLog;
import jakarta.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

/** Documentação para AuditLogSpecification. */
public class AuditLogSpecification {

  /** Documentação. */
  public static Specification<AuditLog> getFilter(
      String search, String action, LocalDateTime startDate, LocalDateTime endDate) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (search != null && !search.isEmpty()) {
        String likePattern = "%" + search.toLowerCase() + "%";
        Predicate p1 =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("details")), likePattern);
        Predicate p2 =
            criteriaBuilder.like(criteriaBuilder.lower(root.get("ipAddress")), likePattern);
        // Note: we can't easily join on User to filter by user name in this simple spec if it's not
        // mapped,
        // but AuditLog has userId. We will ignore userName search in DB for simplicity,
        // or just search in details/IP/action.
        predicates.add(criteriaBuilder.or(p1, p2));
      }

      if (action != null && !action.isEmpty() && !action.equals("Todas as Ações")) {
        // action is an Enum
        try {
          com.edtech.model.AuditAction enumAction = com.edtech.model.AuditAction.valueOf(action);
          predicates.add(criteriaBuilder.equal(root.get("action"), enumAction));
        } catch (IllegalArgumentException ignored) {
          // ignored
        }
      }

      if (startDate != null) {
        predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), startDate));
      }

      if (endDate != null) {
        predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), endDate));
      }

      return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
