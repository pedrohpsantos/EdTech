package com.edtech.dto;

import java.util.List;

public class ComplianceStatsDTO {
  private int score;
  private int scoreTrend;
  private int compliantPolicies;
  private int totalPolicies;
  private int pendingItems;
  private int totalEvents;
  private List<PolicyDTO> policies;

  public static class PolicyDTO {
    private String name;
    private String status; // 'conforme', 'parcial', 'pendente'
    private int percentage;
    private String text;
    
    // getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public int getPercentage() { return percentage; }
    public void setPercentage(int percentage) { this.percentage = percentage; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
  }

  // getters and setters
  public int getScore() { return score; }
  public void setScore(int score) { this.score = score; }
  
  public int getScoreTrend() { return scoreTrend; }
  public void setScoreTrend(int scoreTrend) { this.scoreTrend = scoreTrend; }
  
  public int getCompliantPolicies() { return compliantPolicies; }
  public void setCompliantPolicies(int compliantPolicies) { this.compliantPolicies = compliantPolicies; }
  
  public int getTotalPolicies() { return totalPolicies; }
  public void setTotalPolicies(int totalPolicies) { this.totalPolicies = totalPolicies; }
  
  public int getPendingItems() { return pendingItems; }
  public void setPendingItems(int pendingItems) { this.pendingItems = pendingItems; }
  
  public int getTotalEvents() { return totalEvents; }
  public void setTotalEvents(int totalEvents) { this.totalEvents = totalEvents; }
  
  public List<PolicyDTO> getPolicies() { return policies; }
  public void setPolicies(List<PolicyDTO> policies) { this.policies = policies; }
}
