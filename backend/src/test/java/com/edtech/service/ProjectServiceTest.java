package com.edtech.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.edtech.dto.ProjectMemberRequestDto;
import com.edtech.dto.ProjectRequestDto;
import com.edtech.dto.ProjectResponseDto;
import com.edtech.model.Project;
import com.edtech.model.ProjectMember;
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

    User advisor = new User("test", "test@unb.br", "hash", com.edtech.model.UserRole.RESEARCHER);
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
    verify(projectRepository, times(1)).save(any(Project.class));
    verify(projectMemberRepository, times(1)).save(any(ProjectMember.class));
  }

  @Test
  void listProjectsByUser_ReturnsList() {
    UUID userId = UUID.randomUUID();
    User advisor = new User("test", "test@unb.br", "hash", com.edtech.model.UserRole.RESEARCHER);
    org.springframework.test.util.ReflectionTestUtils.setField(advisor, "id", UUID.randomUUID());

    Project p1 = new Project();
    p1.setId(UUID.randomUUID());
    p1.setTitle("P1");
    p1.setAdvisor(advisor);

    when(projectRepository.findProjectsByUserId(userId)).thenReturn(Collections.singletonList(p1));

    List<ProjectResponseDto> list = projectService.listProjectsByUser(userId);

    assertEquals(1, list.size());
    assertEquals("P1", list.get(0).getTitle());
  }

  @Test
  void addMember_Success() {
    UUID projectId = UUID.randomUUID();
    UUID userId = UUID.randomUUID();
    Project project = new Project();
    project.setId(projectId);
    User authUser = new User("Auth", "auth@test.com", "hash", com.edtech.model.UserRole.RESEARCHER);
    org.springframework.test.util.ReflectionTestUtils.setField(authUser, "id", userId);
    ProjectMemberRequestDto dto = new ProjectMemberRequestDto();
    dto.setUserId(userId);
    dto.setRole("RESEARCHER");

    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, userId)).thenReturn(Optional.empty());
    when(userRepository.findById(userId)).thenReturn(Optional.of(authUser));

    projectService.addMember(projectId, dto, authUser);

    verify(projectMemberRepository, times(1)).save(any(ProjectMember.class));
    verify(auditLogService, times(1)).logAction(eq(userId), any(), anyString());
  }
}
