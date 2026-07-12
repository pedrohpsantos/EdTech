package com.edtech.config;

import com.edtech.model.AuditAction;
import com.edtech.model.AuditLog;
import com.edtech.model.Document;
import com.edtech.model.DocumentStatus;
import com.edtech.model.Project;
import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.DocumentRepository;
import com.edtech.repository.ProjectMemberRepository;
import com.edtech.repository.ProjectRepository;
import com.edtech.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

/** Data seeder para popular o banco de dados com dados iniciais. */
@Configuration
@ConditionalOnWebApplication
public class DataSeeder implements CommandLineRunner {

  private final UserRepository userRepository;
  private final ProjectRepository projectRepository;
  private final ProjectMemberRepository projectMemberRepository;
  private final DocumentRepository documentRepository;
  private final AuditLogRepository auditLogRepository;
  private final PasswordEncoder passwordEncoder;

  /**
   * Construtor do DataSeeder.
   *
   * @param userRepository repositorio de usuario
   * @param projectRepository repositorio de projeto
   * @param documentRepository repositorio de documento
   * @param auditLogRepository repositorio de audit log
   * @param passwordEncoder encoder de senha
   */
  public DataSeeder(
      UserRepository userRepository,
      ProjectRepository projectRepository,
      ProjectMemberRepository projectMemberRepository,
      DocumentRepository documentRepository,
      AuditLogRepository auditLogRepository,
      PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.projectRepository = projectRepository;
    this.projectMemberRepository = projectMemberRepository;
    this.documentRepository = documentRepository;
    this.auditLogRepository = auditLogRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  @Transactional
  public void run(String... args) throws Exception {
    if (userRepository.count() > 0) {
      return; // Database already seeded
    }

    UUID defaultInstitution = UUID.fromString("00000000-0000-0000-0000-000000000001");
    String defaultPassword = passwordEncoder.encode("senha123");

    // 1. Criar Usuários
    User auditor =
        new User(
            "Auditor Externo",
            "auditor@demo.com",
            defaultPassword,
            UserRole.AUDITOR,
            defaultInstitution);
    User advisor =
        new User(
            "Carlos Mendes",
            "carlos@demo.com",
            defaultPassword,
            UserRole.ADVISOR,
            defaultInstitution);
    User researcher =
        new User(
            "Renata Silva",
            "renata@demo.com",
            defaultPassword,
            UserRole.RESEARCHER,
            defaultInstitution);
    User researcher2 =
        new User(
            "João Almeida",
            "joao@demo.com",
            defaultPassword,
            UserRole.RESEARCHER,
            defaultInstitution);

    userRepository.saveAll(List.of(auditor, advisor, researcher, researcher2));

    // 2. Criar Projetos
    Project project1 = new Project();
    project1.setTitle("Projeto IA na Saúde");
    project1.setDescription("Projeto demonstração");
    project1.setAdvisor(advisor);
    projectRepository.save(project1);

    Project project2 = new Project();
    project2.setTitle("Pesquisa Clima");
    project2.setDescription("Projeto demonstração 2");
    project2.setAdvisor(advisor);
    projectRepository.save(project2);

    // Os documentos so ficam visiveis para membros do projeto. Criar estes vinculos
    // tambem faz com que as tres contas demo exercitem o mesmo fluxo de trabalho.
    saveMembership(project1, advisor, com.edtech.model.ProjectRole.ADVISOR);
    saveMembership(project1, researcher, com.edtech.model.ProjectRole.RESEARCHER);
    saveMembership(project1, researcher2, com.edtech.model.ProjectRole.RESEARCHER);
    saveMembership(project2, advisor, com.edtech.model.ProjectRole.ADVISOR);
    saveMembership(project2, researcher, com.edtech.model.ProjectRole.RESEARCHER);

    // 3. Criar Documentos
    Document doc1 = new Document();
    doc1.setProject(project1);
    doc1.setAuthor(researcher);
    doc1.setTitle("Metodologia_Qualitativa_v3.pdf");
    doc1.setStatus(DocumentStatus.PENDING_REVIEW);
    doc1.setFileUrl("fake/path/1.pdf");
    doc1.setInstitutionId(defaultInstitution);
    documentRepository.save(doc1);

    Document doc2 = new Document();
    doc2.setProject(project2);
    doc2.setAuthor(researcher);
    doc2.setTitle("Dataset_Experimento_A.csv");
    doc2.setStatus(DocumentStatus.APPROVED);
    doc2.setFileUrl("fake/path/2.csv");
    doc2.setInstitutionId(defaultInstitution);
    documentRepository.save(doc2);

    Document doc3 = new Document();
    doc3.setProject(project1);
    doc3.setAuthor(researcher2);
    doc3.setTitle("Dataset_Experimento_B.csv");
    doc3.setStatus(DocumentStatus.PENDING_REVIEW);
    doc3.setFileUrl("fake/path/3.csv");
    doc3.setInstitutionId(defaultInstitution);
    documentRepository.save(doc3);

    // 4. Criar Audit Logs (Os 14 eventos da tela)
    LocalDateTime now = LocalDateTime.now();

    saveLog(
        researcher,
        AuditAction.UPLOAD_SUCCESS,
        "Document",
        doc1.getId(),
        "143.107.42.88",
        "Metodologia_Qualitativa_v3.pdf · 2.4 MB",
        now.minusMinutes(10));
    saveLog(
        researcher,
        AuditAction.LOGIN_SUCCESS,
        "System",
        researcher.getId(),
        "143.107.42.88",
        "UA: Chrome/126 · 2FA: TOTP_OK",
        now.minusMinutes(25));
    saveLog(
        advisor,
        AuditAction.DOCUMENT_APPROVED,
        "Document",
        doc2.getId(),
        "200.130.11.220",
        "Dataset_Experimento_A.csv · proj:ia-02",
        now.minusMinutes(40));
    saveLog(
        advisor,
        AuditAction.LOGIN_FAILED,
        "System",
        advisor.getId(),
        "177.82.94.12",
        "Attempt 3/5 · wrong_password",
        now.minusHours(2));
    saveLog(
        advisor,
        AuditAction.REVIEW_DOCUMENT,
        "Document",
        doc1.getId(),
        "200.130.11.220",
        "Referencial_Teorico_Final.pdf · dur:00:04:12",
        now.minusHours(3));
    saveLog(
        auditor,
        AuditAction.MEMBER_JOINED,
        "Project",
        project1.getId(),
        "10.0.0.1",
        "target:usr-7b1e5d80 · ROLE researcher>reviewer",
        now.minusHours(4));
    saveLog(
        researcher,
        AuditAction.DELETE_DOCUMENT,
        "Document",
        doc1.getId(),
        "143.107.42.88",
        "rascunho_inicial_v1.pdf · PERMANENT",
        now.minusDays(1).minusHours(1));
    saveLog(
        advisor,
        AuditAction.DOCUMENT_REJECTED,
        "Document",
        doc3.getId(),
        "200.130.11.220",
        "analise_estatistica_v1.json · reason: incomplete_dataset",
        now.minusDays(1).minusHours(2));
    saveLog(
        advisor,
        AuditAction.REVIEW_DOCUMENT,
        "Document",
        doc1.getId(),
        "177.82.94.12",
        "Referencial_Teorico_Final.pdf · v1>v2 · diff:34_lines",
        now.minusDays(1).minusHours(3));
    saveLog(
        auditor,
        AuditAction.LOGIN_SUCCESS,
        "System",
        auditor.getId(),
        "189.102.55.74",
        "Audit session initiated · UA: Firefox/127",
        now.minusDays(1).minusHours(9));
    saveLog(
        researcher2,
        AuditAction.REGISTER,
        "System",
        researcher2.getId(),
        "192.168.1.42",
        "Email link · token_expiry:3600s · completed_ok",
        now.minusDays(2).minusHours(4));
    saveLog(
        researcher2,
        AuditAction.UPLOAD_SUCCESS,
        "Document",
        doc3.getId(),
        "192.168.1.42",
        "Dataset_Experimento_B.csv · 23.1 MB · virus_scan: CLEAN",
        now.minusDays(2).minusHours(8));
    saveLog(
        advisor,
        AuditAction.LOGIN_FAILED,
        "System",
        advisor.getId(),
        "200.130.11.220",
        "Attempt 1/5 · wrong_password",
        now.minusDays(2).minusHours(11));
    saveLog(
        researcher2,
        AuditAction.REVIEW_DOCUMENT,
        "Document",
        doc1.getId(),
        "192.168.1.42",
        "Metodologia_Qualitativa_v3.pdf · dur:00:12:05",
        now.minusDays(3));
  }

  private void saveLog(
      User user,
      AuditAction action,
      String resourceType,
      UUID resourceId,
      String ip,
      String details,
      LocalDateTime time) {
    AuditLog log =
        new AuditLog(
            user.getInstitutionId(), user.getId(), action, resourceType, resourceId, ip, details);
    try {
      java.lang.reflect.Field createdAtField = AuditLog.class.getDeclaredField("createdAt");
      createdAtField.setAccessible(true);
      createdAtField.set(log, time);
    } catch (Exception ignored) {
      // ignored reflection error
    }
    auditLogRepository.save(log);
  }

  private void saveMembership(Project project, User user, com.edtech.model.ProjectRole role) {
    com.edtech.model.ProjectMember member = new com.edtech.model.ProjectMember();
    member.setProject(project);
    member.setUser(user);
    member.setRole(role);
    projectMemberRepository.save(member);
  }
}
