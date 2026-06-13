package com.edTech.dto;

import java.time.ZonedDateTime;
import java.util.UUID;

public class ProjectResponseDTO {
    private UUID id;
    private String title;
    private String description;
    private UUID advisorId;
    private ZonedDateTime createdAt;

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public UUID getAdvisorId() { return advisorId; }
    public void setAdvisorId(UUID advisorId) { this.advisorId = advisorId; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
