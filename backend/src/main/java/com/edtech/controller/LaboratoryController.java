package com.edtech.controller;

import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.UserRepository;
import com.edtech.service.LaboratoryTokenService;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Javadoc. */
@RestController
@RequestMapping("/api/v1/laboratory")
public class LaboratoryController {

  private final LaboratoryTokenService laboratoryTokenService;
  private final UserRepository userRepository;

  public LaboratoryController(
      LaboratoryTokenService laboratoryTokenService, UserRepository userRepository) {
    this.laboratoryTokenService = laboratoryTokenService;
    this.userRepository = userRepository;
  }

  /** Javadoc. */
  @GetMapping("/token")
  public ResponseEntity<?> getLaboratoryToken(@AuthenticationPrincipal UserDetails userDetails) {
    Optional<User> userOpt = userRepository.findByEmailIgnoreCase(userDetails.getUsername());
    if (userOpt.isEmpty() || userOpt.get().getRole() != UserRole.ADVISOR) {
      return ResponseEntity.status(403)
          .body(Map.of("error", "Apenas orientadores podem gerar tokens do laboratorio"));
    }

    String token = laboratoryTokenService.generateToken(userOpt.get().getId());
    return ResponseEntity.ok(Map.of("token", token, "expires_in", "Final da semana"));
  }

  /** Javadoc. */
  @PostMapping("/join")
  public ResponseEntity<?> joinLaboratory(
      @AuthenticationPrincipal UserDetails userDetails, @RequestBody Map<String, String> request) {
    String token = request.get("token");
    if (token == null || token.isEmpty()) {
      return ResponseEntity.badRequest().body(Map.of("error", "O campo token e obrigatorio"));
    }

    Optional<User> advisorOpt = laboratoryTokenService.findAdvisorByToken(token);
    if (advisorOpt.isEmpty()) {
      return ResponseEntity.status(400).body(Map.of("error", "Token invalido ou expirado"));
    }

    Optional<User> currentUserOpt = userRepository.findByEmailIgnoreCase(userDetails.getUsername());
    if (currentUserOpt.isEmpty()) {
      return ResponseEntity.status(401).build();
    }

    User currentUser = currentUserOpt.get();
    User advisor = advisorOpt.get();

    currentUser.setInstitutionId(advisor.getInstitutionId());
    userRepository.save(currentUser);

    return ResponseEntity.ok(
        Map.of(
            "message", "Vinculado ao laboratorio com sucesso",
            "advisor_name", advisor.getName(),
            "institution_id", advisor.getInstitutionId()));
  }
}
