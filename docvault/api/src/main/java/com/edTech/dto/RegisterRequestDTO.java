package com.edTech.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
public class RegisterRequestDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String name;
    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    @Pattern(regexp = ".+@unb\\.br$", message = "E-mail deve ser do domínio UNB")
    private String email;
    private String password;


    public RegisterRequestDTO() {
    }

    public RegisterRequestDTO(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
