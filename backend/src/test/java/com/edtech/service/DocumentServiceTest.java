package com.edtech.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import java.util.Collections;
import java.io.IOException;

import com.edtech.dto.DocumentResponseDto;
import com.edtech.model.AcaoAuditoria;
import com.edtech.model.Document;
import com.edtech.model.DocumentStatus;
import com.edtech.model.Project;
import com.edtech.model.ProjectMember;
import com.edtech.model.ProjectRole;
import com.edtech.model.User;
import com.edtech.repository.DocumentRepository;
import com.edtech.repository.ProjectMemberRepository;
import com.edtech.repository.ProjectRepository;
import com.edtech.repository.UserRepository;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

@ExtendWith(MockitoExtension.class)
public class DocumentServiceTest {

  @Mock private DocumentRepository documentRepository;
  @Mock private ProjectRepository projectRepository;
  @Mock private UserRepository userRepository;
  @Mock private ProjectMemberRepository projectMemberRepository;
  @Mock private AuditLogService auditLogService;
  @Mock private StorageService storageService;

  @InjectMocks private DocumentService documentService;

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

    author = new User("test", "test@unb.br", "hash", com.edtech.model.UserRole.RESEARCHER);
    org.springframework.test.util.ReflectionTestUtils.setField(author, "id", authorId);

    project = new Project();
    org.springframework.test.util.ReflectionTestUtils.setField(project, "id", projectId);

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
    MockMultipartFile file =
        new MockMultipartFile("file", "test.pdf", "application/pdf", pdfContent);

    when(userRepository.findById(authorId)).thenReturn(Optional.of(author));
    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, authorId))
        .thenReturn(Optional.of(projectMember));
    when(documentRepository.save(any(Document.class))).thenReturn(document);

    DocumentResponseDto response =
        documentService.uploadDocument(file, "Test Doc", projectId, authorId);

    assertNotNull(response);
    assertEquals("Test Doc", response.getTitle());
    verify(storageService, times(1)).uploadFile(any(), anyString(), anyString());
    verify(auditLogService, times(1)).logAction(eq(authorId), eq(AcaoAuditoria.UPLOAD_SUCCESS), anyString());
  }

  @Test
  void testUploadDocument_AuthorNotFound_ThrowsException() {
    MockMultipartFile file = new MockMultipartFile("file", "test.pdf", "application/pdf", new byte[0]);
    when(userRepository.findById(authorId)).thenReturn(Optional.empty());

    RuntimeException exception = assertThrows(RuntimeException.class, () -> documentService.uploadDocument(file, "Test Doc", projectId, authorId));
    assertEquals("Author not found", exception.getMessage());
  }

  @Test
  void testUploadDocument_ProjectNotFound_ThrowsException() {
    MockMultipartFile file = new MockMultipartFile("file", "test.pdf", "application/pdf", new byte[0]);
    when(userRepository.findById(authorId)).thenReturn(Optional.of(author));
    when(projectRepository.findById(projectId)).thenReturn(Optional.empty());

    RuntimeException exception = assertThrows(RuntimeException.class, () -> documentService.uploadDocument(file, "Test Doc", projectId, authorId));
    assertEquals("Project not found", exception.getMessage());
  }

  @Test
  void testUploadDocument_NotMember_ThrowsException() {
    MockMultipartFile file = new MockMultipartFile("file", "test.pdf", "application/pdf", new byte[0]);
    when(userRepository.findById(authorId)).thenReturn(Optional.of(author));
    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, authorId)).thenReturn(Optional.empty());

    RuntimeException exception = assertThrows(RuntimeException.class, () -> documentService.uploadDocument(file, "Test Doc", projectId, authorId));
    assertEquals("Author is not a member of the project", exception.getMessage());
  }

  @Test
  void testUploadDocument_InvalidFileType_ThrowsException() {
    byte[] txtContent = "Hello World".getBytes();
    MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", txtContent);

    when(userRepository.findById(authorId)).thenReturn(Optional.of(author));
    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, authorId))
        .thenReturn(Optional.of(projectMember));

    IllegalArgumentException exception =
        assertThrows(
            IllegalArgumentException.class,
            () -> documentService.uploadDocument(file, "Test Doc", projectId, authorId));

    assertTrue(exception.getMessage().contains("Apenas arquivos PDF reais sao permitidos"));
  }

  @Test
  void testUploadDocument_NullFilename_ThrowsException() {
    org.springframework.web.multipart.MultipartFile file = mock(org.springframework.web.multipart.MultipartFile.class);
    when(file.getOriginalFilename()).thenReturn(null);
    try {
      when(file.getInputStream()).thenReturn(new java.io.ByteArrayInputStream("%PDF-1.4\n%EOF".getBytes()));
    } catch (IOException e) {}

    when(userRepository.findById(authorId)).thenReturn(Optional.of(author));
    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, authorId))
        .thenReturn(Optional.of(projectMember));

    RuntimeException exception = assertThrows(RuntimeException.class, () -> documentService.uploadDocument(file, "Test Doc", projectId, authorId));
    assertEquals(
        "Failed to upload file to Cloud Storage: Filename cannot be null", exception.getMessage());
  }

  @Test
  void testDeleteDocument_Success() throws Exception {
    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    doNothing().when(storageService).deleteFile(anyString());

    documentService.deleteDocument(documentId, authorId);

    verify(documentRepository, times(1)).delete(document);
    verify(auditLogService, times(1)).logAction(eq(authorId), eq(AcaoAuditoria.DELETE_DOCUMENT), anyString());
  }

  @Test
  void testDeleteDocument_NotFound_ThrowsException() {
    when(documentRepository.findById(documentId)).thenReturn(Optional.empty());
    
    RuntimeException exception = assertThrows(RuntimeException.class, () -> documentService.deleteDocument(documentId, authorId));
    assertEquals("Document not found", exception.getMessage());
  }

  @Test
  void testDeleteDocument_NotAuthor_ThrowsException() {
    UUID otherUserId = UUID.randomUUID();
    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    
    RuntimeException exception = assertThrows(RuntimeException.class, () -> documentService.deleteDocument(documentId, otherUserId));
    assertEquals("Only the author can delete this document", exception.getMessage());
  }

  @Test
  void testDeleteDocument_NotDraft_ThrowsException() {
    document.setStatus(DocumentStatus.APPROVED);
    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    
    RuntimeException exception = assertThrows(RuntimeException.class, () -> documentService.deleteDocument(documentId, authorId));
    assertEquals("Only DRAFT documents can be deleted", exception.getMessage());
  }

  @Test
  void testDeleteDocument_StorageError_ThrowsException() throws Exception {
    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    doThrow(new RuntimeException("GCS error")).when(storageService).deleteFile(anyString());

    RuntimeException exception =
        assertThrows(RuntimeException.class, () -> documentService.deleteDocument(documentId, authorId));
    assertTrue(exception.getMessage().contains("Erro ao excluir arquivo físico: GCS error"));
  }

  @Test
  void testReviewDocument_Success() {
    document.setStatus(DocumentStatus.PENDING_REVIEW);
    ProjectMember advisor = new ProjectMember();
    advisor.setRole(ProjectRole.ADVISOR);
    UUID advisorId = UUID.randomUUID();

    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, advisorId))
        .thenReturn(Optional.of(advisor));
    when(documentRepository.save(any(Document.class))).thenReturn(document);

    DocumentResponseDto response =
        documentService.reviewDocument(
            documentId, advisorId, DocumentStatus.APPROVED, "Great work");

    assertNotNull(response);
    assertEquals(DocumentStatus.APPROVED, response.getStatus());
    assertEquals("Great work", response.getFeedback());
    verify(auditLogService, times(1)).logAction(eq(advisorId), eq(AcaoAuditoria.DOCUMENT_APPROVED), anyString());
  }

  @Test
  void testReviewDocument_InvalidStatus_ThrowsException() {
    UUID advisorId = UUID.randomUUID();
    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, 
        () -> documentService.reviewDocument(documentId, advisorId, DocumentStatus.DRAFT, "Great work"));
    assertTrue(exception.getMessage().contains("Status inválido"));
  }

  @Test
  void testReviewDocument_NotMember_ThrowsException() {
    document.setStatus(DocumentStatus.PENDING_REVIEW);
    UUID advisorId = UUID.randomUUID();

    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, advisorId)).thenReturn(Optional.empty());

    RuntimeException exception = assertThrows(RuntimeException.class, 
        () -> documentService.reviewDocument(documentId, advisorId, DocumentStatus.APPROVED, "Great work"));
    assertEquals("Acess denied: You are not a member of this project", exception.getMessage());
  }

  @Test
  void testReviewDocument_NotAdvisor_ThrowsException() {
    document.setStatus(DocumentStatus.PENDING_REVIEW);
    ProjectMember researcher = new ProjectMember();
    researcher.setRole(ProjectRole.RESEARCHER);
    UUID advisorId = UUID.randomUUID();

    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, advisorId)).thenReturn(Optional.of(researcher));

    RuntimeException exception = assertThrows(RuntimeException.class, 
        () -> documentService.reviewDocument(documentId, advisorId, DocumentStatus.APPROVED, "Great work"));
    assertEquals("Acess denied: Only an ADVISOR can review documents", exception.getMessage());
  }

  @Test
  void testReviewDocument_NotPendingReview_ThrowsException() {
    document.setStatus(DocumentStatus.DRAFT);
    ProjectMember advisor = new ProjectMember();
    advisor.setRole(ProjectRole.ADVISOR);
    UUID advisorId = UUID.randomUUID();

    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, advisorId)).thenReturn(Optional.of(advisor));

    RuntimeException exception = assertThrows(RuntimeException.class, 
        () -> documentService.reviewDocument(documentId, advisorId, DocumentStatus.APPROVED, "Great work"));
    assertEquals("Document is not pending review", exception.getMessage());
  }

  @Test
  void testGetPresignedUrl_Success() throws Exception {
    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, authorId))
        .thenReturn(Optional.of(projectMember));
    when(storageService.getPresignedUrl(anyString())).thenReturn("http://presigned.url");

    String url = documentService.getPresignedUrl(documentId, authorId);
    
    assertNotNull(url);
    assertEquals("http://presigned.url", url);
    verify(auditLogService, times(1)).logAction(eq(authorId), eq(AcaoAuditoria.UPLOAD_SUCCESS), anyString());
  }

  @Test
  void testGetPresignedUrl_NotMember_ThrowsException() {
    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, authorId)).thenReturn(Optional.empty());

    RuntimeException exception = assertThrows(RuntimeException.class, () -> documentService.getPresignedUrl(documentId, authorId));
    assertEquals("Access denied: You are not a member of this project", exception.getMessage());
  }

  @Test
  void testGetPresignedUrl_StorageError_ThrowsException() throws Exception {
    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, authorId))
        .thenReturn(Optional.of(projectMember));
    when(storageService.getPresignedUrl(anyString())).thenThrow(new RuntimeException("GCS error"));

    RuntimeException exception = assertThrows(RuntimeException.class, () -> documentService.getPresignedUrl(documentId, authorId));
    assertEquals("Failed to generate presigned URL", exception.getMessage());
  }

  @Test
  void testListDocumentsByUser_Success() {
    Page<Document> page = new PageImpl<>(Collections.singletonList(document));
    when(documentRepository.findDocumentsByUserIdAndFilters(eq(authorId), eq(projectId), anyString(), any(), any()))
        .thenReturn(page);

    Page<DocumentResponseDto> response = documentService.listDocumentsByUser(authorId, projectId, "title", null, PageRequest.of(0, 10));
    
    assertNotNull(response);
    assertEquals(1, response.getContent().size());
  }

  @Test
  void testReviewDocument_Success_Rejected() {
    document.setStatus(DocumentStatus.PENDING_REVIEW);
    ProjectMember advisor = new ProjectMember();
    advisor.setRole(ProjectRole.ADVISOR);
    UUID advisorId = UUID.randomUUID();

    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, advisorId))
        .thenReturn(Optional.of(advisor));
    when(documentRepository.save(any(Document.class))).thenReturn(document);

    DocumentResponseDto response =
        documentService.reviewDocument(
            documentId, advisorId, DocumentStatus.REJECTED, null); 

    assertNotNull(response);
    assertEquals(DocumentStatus.REJECTED, response.getStatus());
    assertNull(response.getFeedback());
    verify(auditLogService, times(1)).logAction(eq(advisorId), eq(AcaoAuditoria.DOCUMENT_REJECTED), anyString());
  }

  @Test
  void testReviewDocument_Success_Rejected_EmptyFeedback() {
    document.setStatus(DocumentStatus.PENDING_REVIEW);
    ProjectMember advisor = new ProjectMember();
    advisor.setRole(ProjectRole.ADVISOR);
    UUID advisorId = UUID.randomUUID();

    when(documentRepository.findById(documentId)).thenReturn(Optional.of(document));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, advisorId))
        .thenReturn(Optional.of(advisor));
    when(documentRepository.save(any(Document.class))).thenReturn(document);

    DocumentResponseDto response =
        documentService.reviewDocument(
            documentId, advisorId, DocumentStatus.REJECTED, "   "); 

    assertNotNull(response);
    assertEquals(DocumentStatus.REJECTED, response.getStatus());
    assertEquals("   ", response.getFeedback());
    verify(auditLogService, times(1)).logAction(eq(advisorId), eq(AcaoAuditoria.DOCUMENT_REJECTED), anyString());
  }

  @Test
  void testUploadDocument_TikaIOException_ThrowsException() throws Exception {
    org.springframework.web.multipart.MultipartFile file = mock(org.springframework.web.multipart.MultipartFile.class);
    when(file.getInputStream()).thenThrow(new IOException("Stream error"));
    
    when(userRepository.findById(authorId)).thenReturn(Optional.of(author));
    when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
    when(projectMemberRepository.findByProjectIdAndUserId(projectId, authorId))
        .thenReturn(Optional.of(projectMember));

    RuntimeException exception = assertThrows(RuntimeException.class, () -> documentService.uploadDocument(file, "Test Doc", projectId, authorId));
    assertEquals("Falha ao analisar o conteudo do arquivo", exception.getMessage());
  }
}
