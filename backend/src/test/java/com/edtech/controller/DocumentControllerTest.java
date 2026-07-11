package com.edtech.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.edtech.dto.DocumentResponseDto;
import com.edtech.model.DocumentStatus;
import com.edtech.model.User;
import com.edtech.service.AuditExportService;
import com.edtech.service.DocumentService;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class DocumentControllerTest {

  private MockMvc mockMvc;

  @Mock private DocumentService documentService;
  @Mock private AuditExportService auditExportService;

  @InjectMocks private DocumentController documentController;

  private User mockUser;

  @BeforeEach
  void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(documentController).build();

    mockUser = mock(User.class);
    when(mockUser.getId()).thenReturn(UUID.randomUUID());
  }

  @Test
  void testUploadDocument_Success() throws Exception {
    MockMultipartFile file =
        new MockMultipartFile("file", "test.pdf", "application/pdf", "dummy".getBytes());
    UUID projectId = UUID.randomUUID();

    DocumentResponseDto responseDto = new DocumentResponseDto();
    responseDto.setId(UUID.randomUUID());
    responseDto.setTitle("Test Doc");

    when(documentService.uploadDocument(any(), any(), any(), any())).thenReturn(responseDto);

    mockMvc
        .perform(
            multipart("/api/documents")
                .file(file)
                .param("title", "Test Doc")
                .param("projectId", projectId.toString())
                .principal(new UsernamePasswordAuthenticationToken(mockUser, null)))
        .andExpect(status().isCreated());
  }

  @Test
  void testExportAuditTrail_Success() throws Exception {
    UUID docId = UUID.randomUUID();
    byte[] csv = "data_hora,usuario_id,acao\n".getBytes();

    when(auditExportService.exportDocumentAuditTrail(eq(docId), any(), eq("csv"))).thenReturn(csv);
    when(auditExportService.buildFilename(eq(docId), eq("csv")))
        .thenReturn("audit-trail-" + docId + ".csv");

    mockMvc
        .perform(
            get("/api/documents/" + docId + "/audit/export")
                .param("format", "csv")
                .principal(new UsernamePasswordAuthenticationToken(mockUser, null)))
        .andExpect(status().isOk())
        .andExpect(header().string("Content-Type", "text/csv"))
        .andExpect(
            header()
                .string(
                    "Content-Disposition",
                    "attachment; filename=\"audit-trail-" + docId + ".csv\""));
  }

  @Test
  void testDeleteDocument_Success() throws Exception {
    UUID docId = UUID.randomUUID();

    mockMvc
        .perform(
            delete("/api/documents/" + docId)
                .principal(new UsernamePasswordAuthenticationToken(mockUser, null)))
        .andExpect(status().isNoContent());
  }

  @Test
  void testUpdateDocumentStatus_Success() throws Exception {
    UUID docId = UUID.randomUUID();

    DocumentResponseDto responseDto = new DocumentResponseDto();
    responseDto.setId(docId);
    responseDto.setStatus(DocumentStatus.APPROVED);

    when(documentService.reviewDocument(eq(docId), any(), eq(DocumentStatus.APPROVED), any()))
        .thenReturn(responseDto);

    String jsonPayload = "{\"status\":\"APPROVED\", \"feedback\":\"Looks good\"}";

    mockMvc
        .perform(
            patch("/api/documents/" + docId + "/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonPayload)
                .principal(new UsernamePasswordAuthenticationToken(mockUser, null)))
        .andExpect(status().isOk());
  }
}
