package com.edtech.controller;

import com.edtech.dto.AuditLogDto;
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

/**
 * Controller para buscar logs de auditoria.
 */
@RestController
@RequestMapping("/api/audit-logs")
public class AuditController {

  private final AuditLogRepository auditLogRepository;
  private final UserRepository userRepository;

  /**
   * Construtor.
   *
   * @param auditLogRepository repo
   * @param userRepository repo
   */
  public AuditController(AuditLogRepository auditLogRepository, UserRepository userRepository) {
    this.auditLogRepository = auditLogRepository;
    this.userRepository = userRepository;
  }

  /**
   * Busca logs de auditoria com filtro.
   *
   * @param search texto de busca
   * @param action acao filtrada
   * @return lista de logs
   */
  @GetMapping
  @PreAuthorize("hasRole('AUDITOR')")
  public ResponseEntity<List<AuditLogDto>> getAuditLogs(
      @RequestParam(required = false) String search,
      @RequestParam(required = false) String action) {
    
    List<AuditLog> logs = auditLogRepository.findAllByOrderByCreatedAtDesc();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    List<AuditLogDto> dtos = logs.stream().map(log -> {
      AuditLogDto dto = new AuditLogDto();
      dto.setId(log.getId().toString());
      dto.setTimestamp(log.getCreatedAt().format(formatter));
      dto.setAction(log.getAction().name());
      
      User user = userRepository.findById(log.getUserId()).orElse(null);
      dto.setUserName(user != null ? user.getName() : "Unknown");
      
      dto.setIp(log.getIpAddress());
      dto.setDetails(log.getDetails());
      
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

    if (search != null && !search.isEmpty()) {
      String s = search.toLowerCase();
      dtos = dtos.stream().filter(dto -> 
          dto.getAction().toLowerCase().contains(s) 
          || (dto.getDetails() != null && dto.getDetails().toLowerCase().contains(s)) 
          || dto.getUserName().toLowerCase().contains(s) 
          || dto.getIp().contains(s)
      ).collect(Collectors.toList());
    }

    if (action != null && !action.isEmpty() && !action.equals("Todas as Ações")) {
      dtos = dtos.stream()
          .filter(dto -> dto.getAction().equals(action))
          .collect(Collectors.toList());
    }

    return ResponseEntity.ok(dtos);
  }
}
