package com.edtech.config;

import com.edtech.model.AuditLog;
import com.edtech.model.AuditAction;
import com.edtech.model.Document;
import com.edtech.model.DocumentStatus;
import com.edtech.model.Project;
import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.AuditLogRepository;
import com.edtech.repository.DocumentRepository;
import com.edtech.repository.ProjectRepository;
import com.edtech.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(
            UserRepository userRepository,
            ProjectRepository projectRepository,
            DocumentRepository documentRepository,
            AuditLogRepository auditLogRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            // Verificar se o admin ja existe
            if (userRepository.findByEmailIgnoreCase("admin@edtech.com").isEmpty()) {
                UUID commonInstitutionId = UUID.fromString("123e4567-e89b-12d3-a456-426614174000");

                // 1. Criar Orientador Demo
                User advisor = new User("Orientador Demo", "advisor@edtech.com", passwordEncoder.encode("senha123"), UserRole.ADVISOR, commonInstitutionId);
                userRepository.save(advisor);

                // 2. Criar Pesquisador Demo
                User researcher = new User("Pesquisador Demo", "researcher@edtech.com", passwordEncoder.encode("senha123"), UserRole.RESEARCHER, commonInstitutionId);
                userRepository.save(researcher);

                // 3. Criar Auditor Demo
                User auditor = new User("Auditor Demo", "auditor@edtech.com", passwordEncoder.encode("senha123"), UserRole.AUDITOR, commonInstitutionId);
                userRepository.save(auditor);

                // 4. Criar um admin
                User admin = new User("Admin", "admin@edtech.com", passwordEncoder.encode("senha123"), UserRole.AUDITOR, commonInstitutionId);
                userRepository.save(admin);

                // 5. Criar Projetos Demo
                Project project1 = new Project();
                project1.setTitle("Análise LGPD Aplicada");
                project1.setDescription("Estudo sobre o impacto da LGPD em startups");
                project1.setAdvisor(advisor);
                projectRepository.save(project1);

                Project project2 = new Project();
                project2.setTitle("Bioinformática Estrutural");
                project2.setDescription("Pesquisa de novos fármacos");
                project2.setAdvisor(advisor);
                projectRepository.save(project2);

                // 6. Criar Documentos Demo
                Document doc1 = new Document();
                doc1.setTitle("Referencial_Teorico_Final.pdf");
                doc1.setStatus(DocumentStatus.APPROVED);
                doc1.setProject(project1);
                doc1.setAuthor(researcher);
                doc1.setInstitutionId(commonInstitutionId);
                doc1.setFileUrl("demo/path/ref.pdf");
                documentRepository.save(doc1);

                Document doc2 = new Document();
                doc2.setTitle("Metodologia_Qualitativa_v3.pdf");
                doc2.setStatus(DocumentStatus.PENDING_REVIEW);
                doc2.setProject(project1);
                doc2.setAuthor(researcher);
                doc2.setInstitutionId(commonInstitutionId);
                doc2.setFileUrl("demo/path/met.pdf");
                documentRepository.save(doc2);

                // 7. Criar Logs de Auditoria Demo
                // AuditLog(UUID institutionId, UUID userId, AuditAction action, String resourceType, UUID resourceId, String ipAddress, String details)
                AuditLog log1 = new AuditLog(commonInstitutionId, advisor.getId(), AuditAction.LOGIN_SUCCESS, "USER", advisor.getId(), "192.168.1.1", "Login realizado com sucesso");
                auditLogRepository.save(log1);

                AuditLog log2 = new AuditLog(commonInstitutionId, researcher.getId(), AuditAction.UPLOAD_SUCCESS, "DOCUMENT", doc1.getId(), "192.168.1.2", "Documento Referencial_Teorico_Final.pdf enviado");
                auditLogRepository.save(log2);

                AuditLog log3 = new AuditLog(commonInstitutionId, advisor.getId(), AuditAction.DOCUMENT_APPROVED, "DOCUMENT", doc1.getId(), "192.168.1.1", "Documento aprovado: Referencial_Teorico_Final.pdf");
                auditLogRepository.save(log3);
                
                AuditLog log4 = new AuditLog(commonInstitutionId, auditor.getId(), AuditAction.REVIEW_DOCUMENT, "DOCUMENT", doc1.getId(), "192.168.1.5", "Documento visualizado");
                auditLogRepository.save(log4);
                
                AuditLog log5 = new AuditLog(commonInstitutionId, admin.getId(), AuditAction.LOGIN_FAILED, "USER", admin.getId(), "192.168.1.99", "Tentativa de login falha. Senha incorreta.");
                auditLogRepository.save(log5);

                System.out.println("Banco de dados populado com contas demo com sucesso!");
            }
        };
    }
}
