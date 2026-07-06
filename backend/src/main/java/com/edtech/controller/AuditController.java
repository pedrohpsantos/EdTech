package com.edtech.controller;

import com.edtech.dto.AuditLogDTO;
import com.edtech.model.AuditLog;
import com.edtech.model.User;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.UserRepository;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/audit-logs")
public class AuditController {

  private final AuditLogRepository auditLogRepository;
  private final UserRepository userRepository;

  public AuditController(AuditLogRepository auditLogRepository, UserRepository userRepository) {
    this.auditLogRepository = auditLogRepository;
    this.userRepository = userRepository;
  }

  @GetMapping
  @PreAuthorize("hasRole('AUDITOR')")
  public ResponseEntity<List<AuditLogDTO>> getAuditLogs(
      @RequestParam(required = false) String search,
      @RequestParam(required = false) String action) {
    
    List<AuditLog> logs = auditLogRepository.findAllByOrderByCreatedAtDesc();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    List<AuditLogDTO> dtos = logs.stream().map(log -> {
      AuditLogDTO dto = new AuditLogDTO();
      dto.setId(log.getId());
      dto.setTimestamp(log.getCreatedAt().format(formatter));
      dto.setAction(log.getAction());
      dto.setUserId(log.getUserId());
      dto.setIp(log.getIpAddress());
      dto.setDetails(log.getDetails());
      dto.setEventId("e" + log.getId().toString().substring(0, 5));
      
      User user = userRepository.findById(log.getUserId()).orElse(null);
      dto.setUserName(user != null ? user.getName() : "Unknown");
      
      // Determine Action Class and Severity based on Action
      switch (log.getAction()) {
        case LOGIN_SUCCESS:
        case DOCUMENT_APPROVED:
          dto.setActionClass("green");
          dto.setSeverity("INFO");
          break;
        case LOGIN_FAILED:
        case DOCUMENT_REJECTED:
        case MEMBER_JOINED:
          dto.setActionClass("orange");
          dto.setSeverity("WARNING");
          break;
        case DELETE_DOCUMENT:
          dto.setActionClass("red");
          dto.setSeverity("CRITICAL");
          break;
        default:
          dto.setActionClass("blue");
          dto.setSeverity("INFO");
      }
      return dto;
    }).collect(Collectors.toList());

    // Apply filtering in memory (for simplicity and speed in this context)
    if (search != null && !search.isEmpty()) {
      String s = search.toLowerCase();
      dtos = dtos.stream().filter(dto -> 
          dto.getAction().name().toLowerCase().contains(s) ||
          (dto.getDetails() != null && dto.getDetails().toLowerCase().contains(s)) ||
          dto.getUserName().toLowerCase().contains(s) ||
          dto.getIp().contains(s)
      ).collect(Collectors.toList());
    }

    if (action != null && !action.isEmpty() && !action.equals("Todas as Ações")) {
      dtos = dtos.stream().filter(dto -> dto.getAction().name().equals(action)).collect(Collectors.toList());
    }

    return ResponseEntity.ok(dtos);
  }
}
