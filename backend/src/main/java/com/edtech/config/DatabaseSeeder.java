package com.edtech.config;

import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.ProjectMemberRepository;
import com.edtech.repository.ProjectRepository;
import com.edtech.repository.UserRepository;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/** Documentação para DatabaseSeeder. */
@Component
@ConditionalOnWebApplication
public class DatabaseSeeder implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);

  private final UserRepository userRepository;
  private final ProjectRepository projectRepository;
  private final ProjectMemberRepository projectMemberRepository;
  private final PasswordEncoder passwordEncoder;

  /** Javadoc. */
  public DatabaseSeeder(
      UserRepository userRepository,
      ProjectRepository projectRepository,
      ProjectMemberRepository projectMemberRepository,
      PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.projectRepository = projectRepository;
    this.projectMemberRepository = projectMemberRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  @Transactional
  public void run(String... args) {
    logger.info("Executando DatabaseSeeder...");

    UUID demoInstitutionId = UUID.fromString("00000000-0000-0000-0000-000000000001");
    String defaultPasswordHash = passwordEncoder.encode("Demo@1234");

    // 1. Criar usuários
    User pesquisador =
        seedUser(
            "Pesquisador Demo",
            "pesquisador.demo@unb.br",
            defaultPasswordHash,
            UserRole.RESEARCHER,
            demoInstitutionId);
    User orientador =
        seedUser(
            "Orientador Demo",
            "orientador.demo@unb.br",
            defaultPasswordHash,
            UserRole.ADVISOR,
            demoInstitutionId);
    seedUser(
        "Auditor Demo",
        "auditor.demo@unb.br",
        defaultPasswordHash,
        UserRole.AUDITOR,
        demoInstitutionId);

    // 2. Criar projetos fake
    if (projectRepository.count() == 0) {
      logger.info("Populando banco com projetos falsos (Kaggle-like datasets)...");

      com.edtech.model.Project p1 = new com.edtech.model.Project();
      p1.setTitle("Previsão de Temperatura Oceânica");
      p1.setDescription("Análise de séries temporais de mudanças climáticas usando dados globais.");
      p1.setAdvisor(orientador);
      projectRepository.save(p1);
      addMember(p1, orientador, com.edtech.model.ProjectRole.ADVISOR);
      addMember(p1, pesquisador, com.edtech.model.ProjectRole.RESEARCHER);

      com.edtech.model.Project p2 = new com.edtech.model.Project();
      p2.setTitle("Classificação de Expressão Genômica");
      p2.setDescription(
          "Dataset com 10.000 perfis genômicos focados em detecção de anomalias raras.");
      p2.setAdvisor(orientador);
      projectRepository.save(p2);
      addMember(p2, orientador, com.edtech.model.ProjectRole.ADVISOR);
      addMember(p2, pesquisador, com.edtech.model.ProjectRole.RESEARCHER);

      com.edtech.model.Project p3 = new com.edtech.model.Project();
      p3.setTitle("Auditoria Algorítmica em Modelos de Crédito");
      p3.setDescription(
          "Projeto voltado à detecção de bias em inteligência artificial do setor financeiro.");
      p3.setAdvisor(orientador);
      projectRepository.save(p3);
      addMember(p3, orientador, com.edtech.model.ProjectRole.ADVISOR);
      addMember(p3, pesquisador, com.edtech.model.ProjectRole.RESEARCHER);

      logger.info("Projetos criados com sucesso.");
    }

    // DataSeeder pode ter criado projetos antes deste componente. Garanta que as
    // contas demo usadas pela interface participem de qualquer projeto existente.
    projectRepository
        .findAll()
        .forEach(
            project -> {
              ensureMember(project, orientador, com.edtech.model.ProjectRole.ADVISOR);
              ensureMember(project, pesquisador, com.edtech.model.ProjectRole.RESEARCHER);
            });

    logger.info("DatabaseSeeder concluído.");
  }

  private User seedUser(
      String name, String email, String passwordHash, UserRole role, UUID institutionId) {
    String normalizedEmail = email.toLowerCase(Locale.ROOT);
    Optional<User> existing = userRepository.findByEmailIgnoreCase(normalizedEmail);
    if (existing.isEmpty()) {
      User user = new User(name, normalizedEmail, passwordHash, role, institutionId);
      user.setActive(true);
      logger.info("Criando usuário demo: {}", email);
      return userRepository.save(user);
    }
    return existing.get();
  }

  private void addMember(
      com.edtech.model.Project project, User user, com.edtech.model.ProjectRole role) {
    com.edtech.model.ProjectMember member = new com.edtech.model.ProjectMember();
    member.setProject(project);
    member.setUser(user);
    member.setRole(role);
    projectMemberRepository.save(member);
  }

  private void ensureMember(
      com.edtech.model.Project project, User user, com.edtech.model.ProjectRole role) {
    if (projectMemberRepository.findByProjectIdAndUserId(project.getId(), user.getId()).isEmpty()) {
      addMember(project, user, role);
    }
  }
}
