package com.edTech.controller;

import com.edTech.dto.ProjectRequestDTO;
import com.edTech.dto.ProjectResponseDTO;
import com.edTech.dto.ProjectMemberRequestDTO;
import com.edTech.model.User;
import com.edTech.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<ProjectResponseDTO> createProject(@RequestBody ProjectRequestDTO dto, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(dto, user.getId()));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> listProjects(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(projectService.listProjectsByUser(user.getId()));
    }

    @PostMapping("/{projectId}/members")
    public ResponseEntity<Void> addMember(
            @PathVariable UUID projectId,
            @RequestBody(required = false) ProjectMemberRequestDTO dto,
            Authentication authentication
    ) {
        User authenticatedUser = (User) authentication.getPrincipal();
        projectService.addMember(projectId, dto, authenticatedUser);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
