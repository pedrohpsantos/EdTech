package com.edTech.service;

import com.edTech.dto.DocumentResponseDTO;
import com.edTech.model.Document;
import com.edTech.model.DocumentStatus;
import com.edTech.model.Project;
import com.edTech.model.ProjectMember;
import com.edTech.model.ProjectRole;
import com.edTech.model.User;
import com.edTech.repository.DocumentRepository;
import com.edTech.repository.ProjectMemberRepository;
import com.edTech.repository.ProjectRepository;
import com.edTech.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DocumentServiceTest {

    @Mock
    private DocumentRepository documentRepository;
    @Mock
    private ProjectRepository projectRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProjectMemberRepository projectMemberRepository;
    @Mock
    private AuditLogService auditLogService;
    @Mock
    private StorageService storageService;

    @InjectMocks
    private DocumentService documentService;

    private User author;
    private Project project;
    private ProjectMember projectMember;
    private Document document;
    private UUID authorId;
    private UUID projectId;
    private UUID documentId;

    @BeforeEach
    void setUp() {
        authorId = UUID.randomUUID();
        projectId = UUID.randomUUID();
        documentId = UUID.randomUUID();

        author = mock(User.class);
        lenient().when(author.getId()).thenReturn(authorId);

        project = mock(Project.class);
        lenient().when(project.getId()).thenReturn(projectId);

        projectMember = new ProjectMember();
        projectMember.setProject(project);
        projectMember.setUser(author);
        projectMember.setRole(ProjectRole.RESEARCHER);

        document = new Document();
        document.setId(documentId);
        document.setTitle("Test Doc");
        document.setFileUrl("test-file-url.pdf");
        document.setStatus(DocumentStatus.DRAFT);
        document.setAuthor(author);
        document.setProject(project);
    }

    @Test
    void testUploadDocument_Success() throws Exception {
        byte[] pdfContent = "%PDF-1.4\n%EOF".getBytes();
        MockMultipartFile file = new MockMultipartFile("file", "test.pdf", "application/pdf", pdfContent);

        when(userRepository.findById(authorId)).thenReturn(Optional.of(author));
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(projectMemberRepository.findByProjectIdAndUserId(projectId, authorId)).thenReturn(Optional.of(projectMember));
        when(documentRepository.save(any(Document.class))).thenReturn(document);

        DocumentResponseDTO response = documentService.uploadDocument(file, "Test Doc", projectId, authorId);

        assertNotNull(response);
        assertEquals("Test Doc", response.getTitle());
        verify(storageService, times(1)).uploadFile(any(), anyString(), anyString());
        verify(auditLogService, times(1)).logAction(eq(authorId), any(), anyString());
    }

    @Test
    void testUploadDocument_InvalidFileType() {
        byte[] txtContent = "Hello World".getBytes();
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", txtContent);

        when(userRepository.findById(authorId)).thenReturn(Optional.of(author));
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(projectMemberRepository.findByProjectIdAndUserId(projectId, authorId)).thenReturn(Optional.of(projectMember));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> 
            documentService.uploadDocument(file, "Test Doc", projectId, authorId)
        );

        assertTrue(exception.getMessage().contains("Apenas arquivos PDF"));
    }

    @Test
    void testDeleteDocument_Success() throws Exception {
        when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
        doNothing().when(storageService).deleteFile(anyString());

        documentService.deleteDocument(documentId, authorId);

        verify(documentRepository, times(1)).delete(document);
        verify(auditLogService, times(1)).logAction(eq(authorId), any(), anyString());
    }

    @Test
    void testReviewDocument_Success() {
        document.setStatus(DocumentStatus.PENDING_REVIEW);
        ProjectMember advisor = new ProjectMember();
        advisor.setRole(ProjectRole.ADVISOR);
        UUID advisorId = UUID.randomUUID();

        when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
        when(projectMemberRepository.findByProjectIdAndUserId(projectId, advisorId)).thenReturn(Optional.of(advisor));
        when(documentRepository.save(any(Document.class))).thenReturn(document);

        DocumentResponseDTO response = documentService.reviewDocument(documentId, advisorId, DocumentStatus.APPROVED, "Great work");

        assertNotNull(response);
        assertEquals(DocumentStatus.APPROVED, response.getStatus());
        verify(auditLogService, times(1)).logAction(eq(advisorId), any(), anyString());
    }
}
