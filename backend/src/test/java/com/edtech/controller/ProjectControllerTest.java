package com.edtech.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.edtech.dto.ProjectRequestDto;
import com.edtech.dto.ProjectResponseDto;
import com.edtech.model.User;
import com.edtech.service.ProjectService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class ProjectControllerTest {

  private MockMvc mockMvc;

  @Mock private ProjectService projectService;

  @InjectMocks private ProjectController projectController;

  private User mockUser;

  @BeforeEach
  void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(projectController).build();
    mockUser = new User("Test", "test@unb.br", "hash", com.edtech.model.UserRole.RESEARCHER, java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(mockUser, "id", UUID.randomUUID());

    UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(mockUser, null, Collections.emptyList());
    SecurityContextHolder.getContext().setAuthentication(auth);
  }

  @AfterEach
  void tearDown() {
    SecurityContextHolder.clearContext();
  }

  @Test
  void createProject_ReturnsCreated() throws Exception {
    ProjectRequestDto request = new ProjectRequestDto();
    request.setTitle("P1");

    ProjectResponseDto response = new ProjectResponseDto();
    response.setTitle("P1");

    when(projectService.createProject(any(), eq(mockUser.getId()))).thenReturn(response);

    mockMvc
        .perform(
            post("/api/projects")
                .principal(SecurityContextHolder.getContext().getAuthentication())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.title").value("P1"));
  }

  @Test
  void listProjects_ReturnsOk() throws Exception {
    ProjectResponseDto response = new ProjectResponseDto();
    response.setTitle("P1");

    when(projectService.listProjectsByUser(mockUser.getId()))
        .thenReturn(Collections.singletonList(response));

    mockMvc
        .perform(
            get("/api/projects")
                .principal(SecurityContextHolder.getContext().getAuthentication())
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].title").value("P1"));
  }
}
