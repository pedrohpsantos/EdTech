package com.edtech.dto;

/** DTO para logs de auditoria. */
public class AuditLogDto {
  private String id;
  private String action;
  private String actionClass;
  private String userName;
  private String ip;
  private String details;
  private String timestamp;
  private String severity;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getAction() {
    return action;
  }

  public void setAction(String action) {
    this.action = action;
  }

  public String getActionClass() {
    return actionClass;
  }

  public void setActionClass(String actionClass) {
    this.actionClass = actionClass;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getIp() {
    return ip;
  }

  public void setIp(String ip) {
    this.ip = ip;
  }

  public String getDetails() {
    return details;
  }

  public void setDetails(String details) {
    this.details = details;
  }

  public String getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(String timestamp) {
    this.timestamp = timestamp;
  }

  public String getSeverity() {
    return severity;
  }

  public void setSeverity(String severity) {
    this.severity = severity;
  }
}
