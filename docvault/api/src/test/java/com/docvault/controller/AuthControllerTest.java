package com.docvault.controller;

import com.docvault.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    void registerCreatesResearcherWithoutReturningPasswordHash() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Ana Pesquisadora",
                                  "email": "ana.pesquisadora@unb.br",
                                  "password": "senha-segura-123"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.name").value("Ana Pesquisadora"))
                .andExpect(jsonPath("$.email").value("ana.pesquisadora@unb.br"))
                .andExpect(jsonPath("$.role").value("RESEARCHER"))
                .andExpect(jsonPath("$.passwordHash").doesNotExist())
                .andExpect(jsonPath("$.password").doesNotExist());

        var user = userRepository.findByEmailIgnoreCase("ana.pesquisadora@unb.br").orElseThrow();

        assertThat(user.getPasswordHash()).isNotEqualTo("senha-segura-123");
        assertThat(user.getPasswordHash()).startsWith("$2");
    }

    @Test
    void registerRejectsNonInstitutionalEmail() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Usuario Externo",
                                  "email": "usuario@example.com",
                                  "password": "senha-segura-123"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("invalid_institutional_email"));
    }

    @Test
    void registerRejectsDuplicatedEmail() throws Exception {
        String payload = """
                {
                  "name": "Usuario Duplicado",
                  "email": "duplicado@unb.br",
                  "password": "senha-segura-123"
                }
                """;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("email_already_registered"));
    }
}
