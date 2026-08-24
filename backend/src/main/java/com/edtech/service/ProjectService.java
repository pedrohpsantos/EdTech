package com.edtech.service;

import com.edtech.dto.ProjectMemberRequestDto;
import com.edtech.dto.ProjectRequestDto;
import com.edtech.dto.ProjectResponseDto;
import com.edtech.model.AuditAction;
import com.edtech.model.Project;
import com.edtech.model.ProjectMember;
import com.edtech.model.ProjectRole;
import com.edtech.model.User;
import com.edtech.repository.ProjectMemberRepository;
import com.edtech.repository.ProjectRepository;
import com.edtech.repository.UserRepository;
import java.util.UUID;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Documentação para ProjectService. */
@Service
public class ProjectService {

  private final ProjectRepository projectRepository;
  private final ProjectMemberRepository projectMemberRepository;
  private final UserRepository userRepository;
  private final AuditLogService auditLogService;

  /** Documentação. */
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

  /** Documentação. */
  @Transactional
  @CacheEvict(value = "projects", key = "#advisorId")
  public ProjectResponseDto createProject(ProjectRequestDto request, UUID advisorId) {
    User advisor = userRepository
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

    return mapToDto(project);
  }

  /** Documentação para o método listProjectsByUser. */
  @Cacheable(value = "projects", key = "#userId + '-' + #pageable.pageNumber + '-' + #pageable.pageSize")
  public org.springframework.data.domain.Page<ProjectResponseDto> listProjectsByUser(
      UUID userId, org.springframework.data.domain.Pageable pageable) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) {
      return projectRepository
          .findProjectsByUserId(userId, pageable)
          .map(project -> mapToDto(project, userId));
    }
    if (user.getRole() == com.edtech.model.UserRole.ADVISOR) {
      return projectRepository
          .findProjectsByUserId(userId, pageable)
          .map(project -> mapToDto(project, userId));
    }
    return projectRepository
        .findProjectsByInstitutionId(user.getInstitutionId(), pageable)
        .map(project -> mapToDto(project, userId));
  }

  /** Documentação. */
  @Transactional
  @CacheEvict(value = "projects", allEntries = true)
  public void addMember(UUID projectId, ProjectMemberRequestDto dto, User authenticatedUser) {
    Project project = projectRepository
        .findById(projectId)
        .orElseThrow(() -> new RuntimeException("Project not found"));

    UUID targetUserId = (dto != null && dto.getUserId() != null) ? dto.getUserId() : authenticatedUser.getId();

    // Se o usuário que está tentando associar alguém for diferente do alvo, ele
    // deve ser ADVISOR do
    // projeto.
    if (!targetUserId.equals(authenticatedUser.getId())) {
      ProjectMember advisorMember = projectMemberRepository
          .findByProjectIdAndUserId(projectId, authenticatedUser.getId())
          .orElseThrow(
              () -> new RuntimeException("User is not part of the project to add members"));

      if (advisorMember.getRole() != ProjectRole.ADVISOR) {
        throw new RuntimeException("Only ADVISORS can add other members");
      }
    }

    if (projectMemberRepository.findByProjectIdAndUserId(projectId, targetUserId).isPresent()) {
      throw new com.edtech.exception.UserAlreadyMemberException(
          "User is already a member of this project");
    }

    User newUser = userRepository
        .findById(targetUserId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    String roleStr = (dto != null && dto.getRole() != null) ? dto.getRole().toUpperCase() : "RESEARCHER";

    ProjectMember newMember = new ProjectMember();
    newMember.setProject(project);
    newMember.setUser(newUser);
    newMember.setRole(ProjectRole.valueOf(roleStr));
    projectMemberRepository.save(newMember);

    auditLogService.logAction(
        authenticatedUser.getId(),
        AuditAction.MEMBER_JOINED,
        "User " + newUser.getEmail() + " joined project " + project.getTitle());
  }

  private ProjectResponseDto mapToDto(Project project) {
    return mapToDto(project, null);
  }

  private ProjectResponseDto mapToDto(Project project, UUID currentUserId) {
    ProjectResponseDto dto = new ProjectResponseDto();
    dto.setId(project.getId());
    dto.setTitle(project.getTitle());
    dto.setDescription(project.getDescription());
    dto.setAdvisorId(project.getAdvisor().getId());
    dto.setCreatedAt(project.getCreatedAt());
    dto.setMember(
        currentUserId != null
            && projectMemberRepository
                .findByProjectIdAndUserId(project.getId(), currentUserId)
                .isPresent());
    return dto;
  }
}
