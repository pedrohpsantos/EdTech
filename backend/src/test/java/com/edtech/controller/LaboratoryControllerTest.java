package com.edtech.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.UserRepository;
import com.edtech.service.LaboratoryTokenService;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

class LaboratoryControllerTest {

  private LaboratoryTokenService tokenService;
  private UserRepository userRepository;
  private LaboratoryController controller;

  @BeforeEach
  void setUp() {
    tokenService = mock(LaboratoryTokenService.class);
    userRepository = mock(UserRepository.class);
    controller = new LaboratoryController(tokenService, userRepository);
  }

  @Test
  void getLaboratoryToken_Success() {
    UserDetails userDetails = mock(UserDetails.class);
    when(userDetails.getUsername()).thenReturn("advisor@unb.br");

    User advisor =
        new User("Dr. Advisor", "advisor@unb.br", "hash", UserRole.ADVISOR, UUID.randomUUID());
    UUID advisorId = UUID.randomUUID();
    org.springframework.test.util.ReflectionTestUtils.setField(advisor, "id", advisorId);
    advisor.setRole(UserRole.ADVISOR);

    when(userRepository.findByEmailIgnoreCase("advisor@unb.br")).thenReturn(Optional.of(advisor));
    when(tokenService.generateToken(advisorId, UserRole.RESEARCHER)).thenReturn("123456");
    when(tokenService.generateToken(advisorId, UserRole.AUDITOR)).thenReturn("654321");

    ResponseEntity<?> response = controller.getLaboratoryToken(userDetails);
    assertEquals(200, response.getStatusCode().value());
    Map<?, ?> body = (Map<?, ?>) response.getBody();
    assertEquals("123456", body.get("researcher_token"));
    assertEquals("654321", body.get("auditor_token"));
  }

  @Test
  void getLaboratoryToken_NotAdvisor() {
    UserDetails userDetails = mock(UserDetails.class);
    when(userDetails.getUsername()).thenReturn("student@unb.br");

    User student =
        new User("Student", "student@unb.br", "hash", UserRole.RESEARCHER, UUID.randomUUID());

    when(userRepository.findByEmailIgnoreCase("student@unb.br")).thenReturn(Optional.of(student));

    ResponseEntity<?> response = controller.getLaboratoryToken(userDetails);
    assertEquals(403, response.getStatusCode().value());
  }

  @Test
  void joinLaboratory_Success() {
    UserDetails userDetails = mock(UserDetails.class);
    when(userDetails.getUsername()).thenReturn("student@unb.br");

    User student =
        new User("Student", "student@unb.br", "hash", UserRole.RESEARCHER, UUID.randomUUID());

    User advisor =
        new User("Dr. Advisor", "advisor@unb.br", "hash", UserRole.ADVISOR, UUID.randomUUID());

    when(tokenService.findAdvisorByToken(eq("123456"), any())).thenReturn(Optional.of(advisor));
    when(userRepository.findByEmailIgnoreCase("student@unb.br")).thenReturn(Optional.of(student));

    ResponseEntity<?> response = controller.joinLaboratory(userDetails, Map.of("token", "123456"));
    assertEquals(200, response.getStatusCode().value());
    verify(userRepository).save(student);
    assertEquals(advisor.getInstitutionId(), student.getInstitutionId());
  }

  @Test
  void joinLaboratory_NoToken() {
    UserDetails userDetails = mock(UserDetails.class);
    ResponseEntity<?> response = controller.joinLaboratory(userDetails, Map.of());
    assertEquals(400, response.getStatusCode().value());
  }

  @Test
  void joinLaboratory_InvalidToken() {
    UserDetails userDetails = mock(UserDetails.class);
    when(userDetails.getUsername()).thenReturn("student@unb.br");
    User student =
        new User("Student", "student@unb.br", "hash", UserRole.RESEARCHER, UUID.randomUUID());
    when(userRepository.findByEmailIgnoreCase("student@unb.br")).thenReturn(Optional.of(student));
    when(tokenService.findAdvisorByToken("123456", UserRole.RESEARCHER))
        .thenReturn(Optional.empty());
    ResponseEntity<?> response = controller.joinLaboratory(userDetails, Map.of("token", "123456"));
    assertEquals(400, response.getStatusCode().value());
  }

  @Test
  void joinLaboratory_UserNotFound() {
    UserDetails userDetails = mock(UserDetails.class);
    when(userDetails.getUsername()).thenReturn("student@unb.br");
    User advisor =
        new User("Dr. Advisor", "advisor@unb.br", "hash", UserRole.ADVISOR, UUID.randomUUID());
    when(userRepository.findByEmailIgnoreCase("student@unb.br")).thenReturn(Optional.empty());

    ResponseEntity<?> response = controller.joinLaboratory(userDetails, Map.of("token", "123456"));
    assertEquals(401, response.getStatusCode().value());
  }
}
