package com.edtech.controller;

import com.edtech.dto.ProjectMemberRequestDto;
import com.edtech.dto.ProjectRequestDto;
import com.edtech.dto.ProjectResponseDto;
import com.edtech.model.User;
import com.edtech.service.ProjectService;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Documentação para ProjectController. */
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

  private final ProjectService projectService;

  /** Documentação para o método ProjectController. */
  public ProjectController(ProjectService projectService) {
    this.projectService = projectService;
  }

  /** Documentação. */
  @PostMapping
  public ResponseEntity<ProjectResponseDto> createProject(
      @RequestBody ProjectRequestDto dto, Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(projectService.createProject(dto, user.getId()));
  }

  @GetMapping
  public ResponseEntity<List<ProjectResponseDto>> listProjects(Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return ResponseEntity.ok(projectService.listProjectsByUser(user.getId()));
  }

  /** Documentação. */
  @PostMapping("/{projectId}/members")
  public ResponseEntity<Void> addMember(
      @PathVariable UUID projectId,
      @RequestBody(required = false) ProjectMemberRequestDto dto,
      Authentication authentication) {
    User authenticatedUser = (User) authentication.getPrincipal();
    projectService.addMember(projectId, dto, authenticatedUser);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }
}
