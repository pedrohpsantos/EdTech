package com.edTech.controller;

import com.edTech.dto.DocumentResponseDTO;
import com.edTech.model.DocumentStatus;
import com.edTech.model.User;
import com.edTech.service.DocumentService;
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

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class DocumentControllerTest {

    private MockMvc mockMvc;

    @Mock
    private DocumentService documentService;

    @InjectMocks
    private DocumentController documentController;

    private User mockUser;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(documentController).build();

        mockUser = mock(User.class);
        when(mockUser.getId()).thenReturn(UUID.randomUUID());
    }

    @Test
    void testUploadDocument_Success() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.pdf", "application/pdf", "dummy".getBytes());
        UUID projectId = UUID.randomUUID();

        DocumentResponseDTO responseDTO = new DocumentResponseDTO();
        responseDTO.setId(UUID.randomUUID());
        responseDTO.setTitle("Test Doc");

        when(documentService.uploadDocument(any(), any(), any(), any())).thenReturn(responseDTO);

        mockMvc.perform(multipart("/api/documents")
                .file(file)
                .param("title", "Test Doc")
                .param("projectId", projectId.toString())
                .principal(new UsernamePasswordAuthenticationToken(mockUser, null)))
                .andExpect(status().isCreated());
    }

    @Test
    void testDeleteDocument_Success() throws Exception {
        UUID docId = UUID.randomUUID();

        mockMvc.perform(delete("/api/documents/" + docId)
                .principal(new UsernamePasswordAuthenticationToken(mockUser, null)))
                .andExpect(status().isNoContent());
    }

    @Test
    void testUpdateDocumentStatus_Success() throws Exception {
        UUID docId = UUID.randomUUID();

        DocumentResponseDTO responseDTO = new DocumentResponseDTO();
        responseDTO.setId(docId);
        responseDTO.setStatus(DocumentStatus.APPROVED);

        when(documentService.reviewDocument(eq(docId), any(), eq(DocumentStatus.APPROVED), any()))
                .thenReturn(responseDTO);

        String jsonPayload = "{\"status\":\"APPROVED\", \"feedback\":\"Looks good\"}";

        mockMvc.perform(patch("/api/documents/" + docId + "/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonPayload)
                .principal(new UsernamePasswordAuthenticationToken(mockUser, null)))
                .andExpect(status().isOk());
    }
}
