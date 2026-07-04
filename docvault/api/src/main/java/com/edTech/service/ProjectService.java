package com.edTech.service;

import com.edTech.dto.ProjectMemberRequestDTO;
import com.edTech.dto.ProjectRequestDTO;
import com.edTech.dto.ProjectResponseDTO;
import com.edTech.model.AcaoAuditoria;
import com.edTech.model.Project;
import com.edTech.model.ProjectMember;
import com.edTech.model.ProjectRole;
import com.edTech.model.User;
import com.edTech.repository.ProjectMemberRepository;
import com.edTech.repository.ProjectRepository;
import com.edTech.repository.UserRepository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {

  private final ProjectRepository projectRepository;
  private final ProjectMemberRepository projectMemberRepository;
  private final UserRepository userRepository;
  private final AuditLogService auditLogService;

  public ProjectService(
      ProjectRepository projectRepository,
      ProjectMemberRepository projectMemberRepository,
      UserRepository userRepository,
      AuditLogService auditLogService) {
    this.projectRepository = projectRepository;
    this.projectMemberRepository = projectMemberRepository;
    this.userRepository = userRepository;
    this.auditLogService = auditLogService;
  }

  @Transactional
  public ProjectResponseDTO createProject(ProjectRequestDTO request, UUID advisorId) {
    User advisor =
        userRepository
            .findById(advisorId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Project project = new Project();
    project.setTitle(request.getTitle());
    project.setDescription(request.getDescription());
    project.setAdvisor(advisor);

    project = projectRepository.save(project);

    ProjectMember member = new ProjectMember();
    member.setProject(project);
    member.setUser(advisor);
    member.setRole(ProjectRole.ADVISOR);
    projectMemberRepository.save(member);

    return mapToDTO(project);
  }

  public List<ProjectResponseDTO> listProjectsByUser(UUID userId) {
    return projectRepository.findProjectsByUserId(userId).stream()
        .map(this::mapToDTO)
        .collect(Collectors.toList());
  }

  @Transactional
  public void addMember(UUID projectId, ProjectMemberRequestDTO dto, User authenticatedUser) {
    Project project =
        projectRepository
            .findById(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found"));

    UUID targetUserId =
        (dto != null && dto.getUserId() != null) ? dto.getUserId() : authenticatedUser.getId();

    // Se o usuário que está tentando associar alguém for diferente do alvo, ele deve ser ADVISOR do
    // projeto.
    if (!targetUserId.equals(authenticatedUser.getId())) {
      ProjectMember advisorMember =
          projectMemberRepository
              .findByProjectIdAndUserId(projectId, authenticatedUser.getId())
              .orElseThrow(
                  () -> new RuntimeException("User is not part of the project to add members"));

      if (advisorMember.getRole() != ProjectRole.ADVISOR) {
        throw new RuntimeException("Only ADVISORS can add other members");
      }
    }

    if (projectMemberRepository.findByProjectIdAndUserId(projectId, targetUserId).isPresent()) {
      throw new RuntimeException("User is already a member of this project");
    }

    User newUser =
        userRepository
            .findById(targetUserId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    String roleStr =
        (dto != null && dto.getRole() != null) ? dto.getRole().toUpperCase() : "RESEARCHER";

    ProjectMember newMember = new ProjectMember();
    newMember.setProject(project);
    newMember.setUser(newUser);
    newMember.setRole(ProjectRole.valueOf(roleStr));
    projectMemberRepository.save(newMember);

    auditLogService.logAction(
        authenticatedUser.getId(),
        AcaoAuditoria.MEMBER_JOINED,
        "User " + newUser.getEmail() + " joined project " + project.getTitle());
  }

  private ProjectResponseDTO mapToDTO(Project project) {
    ProjectResponseDTO dto = new ProjectResponseDTO();
    dto.setId(project.getId());
    dto.setTitle(project.getTitle());
    dto.setDescription(project.getDescription());
    dto.setAdvisorId(project.getAdvisor().getId());
    dto.setCreatedAt(project.getCreatedAt());
    return dto;
  }
}
