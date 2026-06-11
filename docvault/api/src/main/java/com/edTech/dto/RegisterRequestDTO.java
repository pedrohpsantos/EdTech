package com.edTech.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
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


}
