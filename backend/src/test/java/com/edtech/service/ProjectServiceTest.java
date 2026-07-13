package com.edtech.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.edtech.dto.ProjectMemberRequestDto;
import com.edtech.dto.ProjectRequestDto;
import com.edtech.dto.ProjectResponseDto;
import com.edtech.model.Project;
import com.edtech.model.ProjectMember;
import com.edtech.model.ProjectRole;
import com.edtech.model.User;
import com.edtech.repository.ProjectMemberRepository;
import com.edtech.repository.ProjectRepository;
import com.edtech.repository.UserRepository;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceTest {

  @Mock private ProjectRepository projectRepository;
  @Mock private ProjectMemberRepository projectMemberRepository;
  @Mock private UserRepository userRepository;
  @Mock private AuditLogService auditLogService;

  @InjectMocks private ProjectService projectService;

  @Test
  void createProject_WithValidData_ReturnsProjectDto() {
    UUID advisorId = UUID.randomUUID();
    ProjectRequestDto request = new ProjectRequestDto();
    request.setTitle("New Project");
    request.setDescription("Project Desc");

    User advisor =
        new User(
            "test",
            "test@unb.br",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(advisor, "id", advisorId);

    Project savedProject = new Project();
    savedProject.setId(UUID.randomUUID());
    savedProject.setTitle("New Project");
    savedProject.setDescription("Project Desc");
    savedProject.setAdvisor(advisor);

    when(userRepository.findById(advisorId)).thenReturn(Optional.of(advisor));
    when(projectRepository.save(any(Project.class))).thenReturn(savedProject);

    ProjectResponseDto response = projectService.createProject(request, advisorId);

    assertNotNull(response);
    assertEquals("New Project", response.getTitle());
    assertEquals("Project Desc", response.getDescription());
    assertEquals(advisorId, response.getAdvisorId());

    verify(projectRepository).save(any(Project.class));
    verify(projectMemberRepository)
        .save(
            argThat(
                member ->
                    member.getRole() == ProjectRole.ADVISOR && member.getUser().equals(advisor)));
  }

  @Test
  void createProject_UserNotFound_ThrowsException() {
    UUID advisorId = UUID.randomUUID();
    ProjectRequestDto request = new ProjectRequestDto();

    when(userRepository.findById(advisorId)).thenReturn(Optional.empty());

    RuntimeException ex =
        assertThrows(
            RuntimeException.class, () -> projectService.createProject(request, advisorId));
    assertEquals("User not found", ex.getMessage());
    verify(projectRepository, never()).save(any());
  }

  @Test
  void listProjectsByUser_ReturnsList() {
    UUID userId = UUID.randomUUID();
    User advisor =
        new User(
            "test",
            "test@unb.br",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(advisor, "id", UUID.randomUUID());

    Project p1 = new Project();
    p1.setId(UUID.randomUUID());
    p1.setTitle("P1");
    p1.setAdvisor(advisor);

    when(projectRepository.findProjectsByUserId(eq(userId), any()))
        .thenReturn(new PageImpl<>(Collections.singletonList(p1)));

    org.springframework.data.domain.Page<ProjectResponseDto> list =
        projectService.listProjectsByUser(userId, PageRequest.of(0, 20));

    assertEquals(1, list.getContent().size());
    assertEquals("P1", list.getContent().get(0).getTitle());
    assertEquals(p1.getId(), list.getContent().get(0).getId());
  }

  @Test
  void addMember_Success_SelfAdd() {
    UUID projectId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Project project = new Project();
    project.setId(projectId);
    project.setTitle("Proj");
    User authUser =
        new User(
            "Auth",
            "auth@test.com",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(authUser, "id", userId);

    ProjectMemberRequestDto dto = new ProjectMemberRequestDto();
    dto.setUserId(userId);
    dto.setRole("RESEARCHER");

    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, userId))
        .thenReturn(Optional.empty());
    when(userRepository.findById(userId)).thenReturn(Optional.of(authUser));

    projectService.addMember(projectId, dto, authUser);

    verify(projectMemberRepository)
        .save(
            argThat(
                member ->
                    member.getRole() == ProjectRole.RESEARCHER
                        && member.getUser().getId().equals(userId)));
    verify(auditLogService).logAction(eq(userId), any(), anyString());
  }

  @Test
  void addMember_ProjectNotFound_ThrowsException() {
    UUID projectId = UUID.randomUUID();
    User authUser =
        new User(
            "Auth",
            "auth@test.com",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());

    when(projectRepository.findById(projectId)).thenReturn(Optional.empty());

    RuntimeException ex =
        assertThrows(
            RuntimeException.class,
            () -> projectService.addMember(projectId, new ProjectMemberRequestDto(), authUser));
    assertEquals("Project not found", ex.getMessage());
  }

  @Test
  void addMember_TargetUserDifferent_AuthUserNotMember_ThrowsException() {
    UUID projectId = UUID.randomUUID();
    UUID authUserId = UUID.randomUUID();
    UUID targetUserId = UUID.randomUUID();

    Project project = new Project();
    project.setId(projectId);

    User authUser =
        new User(
            "Auth",
            "auth@test.com",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(authUser, "id", authUserId);

    ProjectMemberRequestDto dto = new ProjectMemberRequestDto();
    dto.setUserId(targetUserId);

    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, authUserId))
        .thenReturn(Optional.empty());

    RuntimeException ex =
        assertThrows(
            RuntimeException.class, () -> projectService.addMember(projectId, dto, authUser));
    assertEquals("User is not part of the project to add members", ex.getMessage());
  }

  @Test
  void addMember_TargetUserDifferent_AuthUserNotAdvisor_ThrowsException() {
    UUID projectId = UUID.randomUUID();
    UUID authUserId = UUID.randomUUID();
    UUID targetUserId = UUID.randomUUID();

    Project project = new Project();
    project.setId(projectId);

    User authUser =
        new User(
            "Auth",
            "auth@test.com",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(authUser, "id", authUserId);

    ProjectMemberRequestDto dto = new ProjectMemberRequestDto();
    dto.setUserId(targetUserId);

    ProjectMember authMember = new ProjectMember();
    authMember.setRole(ProjectRole.RESEARCHER);

    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, authUserId))
        .thenReturn(Optional.of(authMember));

    RuntimeException ex =
        assertThrows(
            RuntimeException.class, () -> projectService.addMember(projectId, dto, authUser));
    assertEquals("Only ADVISORS can add other members", ex.getMessage());
  }

  @Test
  void addMember_UserAlreadyMember_ThrowsException() {
    UUID projectId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Project project = new Project();
    project.setId(projectId);
    User authUser =
        new User(
            "Auth",
            "auth@test.com",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(authUser, "id", userId);

    ProjectMemberRequestDto dto = new ProjectMemberRequestDto();
    dto.setUserId(userId);

    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, userId))
        .thenReturn(Optional.of(new ProjectMember()));

    RuntimeException ex =
        assertThrows(
            RuntimeException.class, () -> projectService.addMember(projectId, dto, authUser));
    assertEquals("User is already a member of this project", ex.getMessage());
  }

  @Test
  void addMember_WithNullDto_DefaultsToAuthUserAndResearcherRole() {
    UUID projectId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Project project = new Project();
    project.setId(projectId);
    project.setTitle("Proj");
    User authUser =
        new User(
            "Auth",
            "auth@test.com",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(authUser, "id", userId);

    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, userId))
        .thenReturn(Optional.empty());
    when(userRepository.findById(userId)).thenReturn(Optional.of(authUser));

    projectService.addMember(projectId, null, authUser);

    verify(projectMemberRepository)
        .save(
            argThat(
                member ->
                    member.getRole() == ProjectRole.RESEARCHER
                        && member.getUser().getId().equals(userId)));
    verify(auditLogService).logAction(eq(userId), any(), anyString());
  }

  @Test
  void addMember_WithNullUserIdInDto_DefaultsToAuthUserId() {
    UUID projectId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Project project = new Project();
    project.setId(projectId);
    project.setTitle("Proj");
    User authUser =
        new User(
            "Auth",
            "auth@test.com",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(authUser, "id", userId);

    ProjectMemberRequestDto dto = new ProjectMemberRequestDto();
    dto.setRole("ADVISOR");

    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, userId))
        .thenReturn(Optional.empty());
    when(userRepository.findById(userId)).thenReturn(Optional.of(authUser));

    projectService.addMember(projectId, dto, authUser);

    verify(projectMemberRepository)
        .save(
            argThat(
                member ->
                    member.getRole() == ProjectRole.ADVISOR
                        && member.getUser().getId().equals(userId)));
  }

  @Test
  void addMember_WithNullRoleInDto_DefaultsToResearcherRole() {
    UUID projectId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Project project = new Project();
    project.setId(projectId);
    project.setTitle("Proj");
    User authUser =
        new User(
            "Auth",
            "auth@test.com",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(authUser, "id", userId);

    ProjectMemberRequestDto dto = new ProjectMemberRequestDto();
    dto.setUserId(userId);

    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, userId))
        .thenReturn(Optional.empty());
    when(userRepository.findById(userId)).thenReturn(Optional.of(authUser));

    projectService.addMember(projectId, dto, authUser);

    verify(projectMemberRepository)
        .save(
            argThat(
                member ->
                    member.getRole() == ProjectRole.RESEARCHER
                        && member.getUser().getId().equals(userId)));
  }

  @Test
  void addMember_UserNotFound_ThrowsException() {
    UUID projectId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Project project = new Project();
    project.setId(projectId);
    User authUser =
        new User(
            "Auth",
            "auth@test.com",
            "hash",
            com.edtech.model.UserRole.RESEARCHER,
            java.util.UUID.randomUUID());
    org.springframework.test.util.ReflectionTestUtils.setField(authUser, "id", userId);

    ProjectMemberRequestDto dto = new ProjectMemberRequestDto();
    dto.setUserId(userId);

    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, userId))
        .thenReturn(Optional.empty());
    when(userRepository.findById(userId)).thenReturn(Optional.empty());

    RuntimeException ex =
        assertThrows(
            RuntimeException.class, () -> projectService.addMember(projectId, dto, authUser));
    assertEquals("User not found", ex.getMessage());
  }
}
