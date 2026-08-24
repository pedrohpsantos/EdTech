package com.edtech.controller;

import com.edtech.dto.AuditLogDto;
import com.edtech.model.AuditLog;
import com.edtech.model.User;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.AuditLogSpecification;
import com.edtech.repository.UserRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** Controller para buscar logs de auditoria. */
@RestController
@RequestMapping("/api/audit-logs")
public class AuditController {

  private final AuditLogRepository auditLogRepository;
  private final UserRepository userRepository;

  /**
   * Construtor.
   *
   * @param auditLogRepository repo
   * @param userRepository     repo
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
  public ResponseEntity<Page<AuditLogDto>> getAuditLogs(
      @RequestParam(required = false) String search,
      @RequestParam(required = false) String action,
      @RequestParam(required = false) String startDate,
      @RequestParam(required = false) String endDate,
      @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

    LocalDateTime start = null;
    LocalDateTime end = null;
    try {
      if (startDate != null && !startDate.isEmpty()) {
        start = LocalDateTime.parse(startDate);
      }
      if (endDate != null && !endDate.isEmpty()) {
        end = LocalDateTime.parse(endDate);
      }
    } catch (DateTimeParseException ignored) {
      // ignored
    }

    Page<AuditLog> logsPage = auditLogRepository.findAll(
        AuditLogSpecification.getFilter(search, action, start, end), pageable);
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    java.util.Set<UUID> userIds = logsPage.getContent().stream()
        .map(log -> log.getUserId())
        .collect(java.util.stream.Collectors.toSet());
    java.util.Map<UUID, User> userMap = userRepository.findAllById(userIds).stream()
        .collect(java.util.stream.Collectors.toMap(u -> u.getId(), u -> u));

    List<AuditLogDto> dtos = logsPage.getContent().stream()
        .map(
            log -> {
              AuditLogDto dto = new AuditLogDto();
              dto.setId(log.getId().toString());
              dto.setTimestamp(log.getCreatedAt().format(formatter));
              dto.setAction(log.getAction().name());

              User user = userMap.get(log.getUserId());
              dto.setUserName(user != null ? user.getName() : "Unknown");

              dto.setIp(log.getIpAddress());
              dto.setDetails(log.getDetails());

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
            })
        .collect(Collectors.toList());

    return ResponseEntity.ok(new PageImpl<>(dtos, pageable, logsPage.getTotalElements()));
  }

  /**
   * Exporta logs de auditoria para CSV.
   *
   * @param search texto de busca
   * @param action acao filtrada
   * @return Arquivo CSV
   */
  @GetMapping("/export")
  @PreAuthorize("hasRole('AUDITOR')")
  public ResponseEntity<String> exportAuditLogs(
      @RequestParam(required = false) String search,
      @RequestParam(required = false) String action,
      @RequestParam(required = false) String startDate,
      @RequestParam(required = false) String endDate) {

    ResponseEntity<Page<AuditLogDto>> response = getAuditLogs(
        search,
        action,
        startDate,
        endDate,
        org.springframework.data.domain.PageRequest.of(
            0, 10000, Sort.by(Sort.Direction.DESC, "createdAt")));
    List<AuditLogDto> dtos = response.getBody().getContent();

    StringBuilder csv = new StringBuilder();
    csv.append("ID,Timestamp,Action,User,IP,Details,Severity\n");

    if (dtos != null) {
      for (AuditLogDto dto : dtos) {
        csv.append(escapeCsv(dto.getId()))
            .append(",")
            .append(escapeCsv(dto.getTimestamp()))
            .append(",")
            .append(escapeCsv(dto.getAction()))
            .append(",")
            .append(escapeCsv(dto.getUserName()))
            .append(",")
            .append(escapeCsv(dto.getIp()))
            .append(",")
            .append(escapeCsv(dto.getDetails()))
            .append(",")
            .append(escapeCsv(dto.getSeverity()))
            .append("\n");
      }
    }

    org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
    headers.add("Content-Disposition", "attachment; filename=\"audit_logs.csv\"");
    headers.add("Content-Type", "text/csv; charset=UTF-8");

    return ResponseEntity.ok()
        .headers(headers)
        .header("X-Content-Type-Options", "nosniff")
        .header("Content-Security-Policy", "default-src 'none'")
        .body(csv.toString().replaceAll("[<>\"'%;()&]", "_"));
  }

  private String escapeCsv(String value) {
    if (value == null) {
      return "";
    }
    String escaped = value.replace("\"", "\"\"");
    if (escaped.contains(",") || escaped.contains("\"") || escaped.contains("\n")) {
      return "\"" + escaped + "\"";
    }
    return escaped;
  }
}
