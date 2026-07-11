package com.edtech.dto;

import jakarta.validation.constraints.NotBlank;

public class CommentRequestDto {
  @NotBlank(message = "O conteúdo do comentário não pode estar vazio")
  private String content;

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
