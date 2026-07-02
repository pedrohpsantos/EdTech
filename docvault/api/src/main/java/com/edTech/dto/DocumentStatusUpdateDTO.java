package com.edTech.dto;

import com.edTech.model.DocumentStatus;
import jakarta.validation.constraints.NotNull;

public class DocumentStatusUpdateDTO {

    @NotNull(message = "Status is required")
    private DocumentStatus status;

    private String feedback;

    public DocumentStatusUpdateDTO() {
    }

    public DocumentStatusUpdateDTO(DocumentStatus status, String feedback) {
        this.status = status;
        this.feedback = feedback;
    }

    public DocumentStatus getStatus() {
        return status;
    }

    public void setStatus(DocumentStatus status) {
        this.status = status;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
