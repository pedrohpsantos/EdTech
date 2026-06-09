package com.docvault.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.jspecify.annotations.Nullable;

import java.time.LocalDateTime;
@Entity
@Table(name = "users")
public class User {
    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Getter
    private  String name;
    @Getter
    private String email;
    @Getter
    private String passwordHash;
    @Getter @Setter
    private String role;
    @Getter @Setter
    private Boolean active;
    @Getter
    private LocalDateTime createdAt;
    @Getter
    private  LocalDateTime updatedAt;
    public  User(String name, String email, String passwordHash, String role, Boolean active) {

        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.active = active;
        this.createdAt = LocalDateTime.now();
    }

    public User() {

    }


}
