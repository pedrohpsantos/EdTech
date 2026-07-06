package com.edtech.dto;

import com.edtech.model.AcaoAuditoria;
import java.util.UUID;

public class AuditLogDTO {
  private UUID id;
  private String timestamp;
  private AcaoAuditoria action;
  private String actionClass;
  private UUID userId;
  private String userName;
  private String ip;
  private String details;
  private String eventId;
  private String severity;

  public AuditLogDTO() {}

  // Getters and Setters
  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  
  public String getTimestamp() { return timestamp; }
  public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
  
  public AcaoAuditoria getAction() { return action; }
  public void setAction(AcaoAuditoria action) { this.action = action; }
  
  public String getActionClass() { return actionClass; }
  public void setActionClass(String actionClass) { this.actionClass = actionClass; }
  
  public UUID getUserId() { return userId; }
  public void setUserId(UUID userId) { this.userId = userId; }
  
  public String getUserName() { return userName; }
  public void setUserName(String userName) { this.userName = userName; }
  
  public String getIp() { return ip; }
  public void setIp(String ip) { this.ip = ip; }
  
  public String getDetails() { return details; }
  public void setDetails(String details) { this.details = details; }
  
  public String getEventId() { return eventId; }
  public void setEventId(String eventId) { this.eventId = eventId; }
  
  public String getSeverity() { return severity; }
  public void setSeverity(String severity) { this.severity = severity; }
}
