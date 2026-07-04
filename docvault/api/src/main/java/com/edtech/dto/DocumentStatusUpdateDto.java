package com.edtech.dto;

import com.edtech.model.DocumentStatus;
import jakarta.validation.constraints.NotNull;

/** Documentação para DocumentStatusUpdateDto. */
public class DocumentStatusUpdateDto {

  @NotNull(message = "Status is required")
  private DocumentStatus status;

  private String feedback;

  /** Documentação para o método DocumentStatusUpdateDto. */
  public DocumentStatusUpdateDto() {}

  /** Documentação para o método DocumentStatusUpdateDto. */
  public DocumentStatusUpdateDto(DocumentStatus status, String feedback) {
    this.status = status;
    this.feedback = feedback;
  }

  /** Documentação para o método getStatus. */
  public DocumentStatus getStatus() {
    return status;
  }

  /** Documentação para o método setStatus. */
  public void setStatus(DocumentStatus status) {
    this.status = status;
  }

  /** Documentação para o método getFeedback. */
  public String getFeedback() {
    return feedback;
  }

  /** Documentação para o método setFeedback. */
  public void setFeedback(String feedback) {
    this.feedback = feedback;
  }
}
