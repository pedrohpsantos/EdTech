package com.edtech.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.edtech.model.User;
import com.edtech.model.UserRole;
import com.edtech.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

class LaboratoryTokenServiceTest {

    private UserRepository userRepository;
    private LaboratoryTokenService service;
    private final String secret = "test-secret";

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        service = new LaboratoryTokenService(userRepository, secret);
    }

    @Test
    void testGenerateToken() {
        UUID advisorId = UUID.randomUUID();
        String token = service.generateToken(advisorId);
        assertNotNull(token);
        assertEquals(6, token.length());
    }

    @Test
    void testGenerateToken_Deterministic() throws Exception {
        UUID advisorId = UUID.fromString("00000000-0000-0000-0000-000000000000");
        long currentWeek = System.currentTimeMillis() / (7L * 24 * 60 * 60 * 1000);
        String rawData = advisorId.toString() + ":" + currentWeek + ":" + secret;
        
        java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(rawData.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        int offset = hash[hash.length - 1] & 0xf;
        int binary =
            ((hash[offset] & 0x7f) << 24)
                | ((hash[offset + 1] & 0xff) << 16)
                | ((hash[offset + 2] & 0xff) << 8)
                | (hash[offset + 3] & 0xff);
        int otp = binary % 1000000;
        String expectedToken = String.format("%06d", otp);
        
        String token = service.generateToken(advisorId);
        assertEquals(expectedToken, token);
    }

    @Test
    void testFindAdvisorByToken_Found() {
        User advisor = new User("Test", "test@unb.br", "hash", UserRole.ADVISOR, UUID.randomUUID());
        UUID advisorId = UUID.randomUUID();
        org.springframework.test.util.ReflectionTestUtils.setField(advisor, "id", advisorId);
        advisor.setRole(UserRole.ADVISOR);
        
        when(userRepository.findByRole(UserRole.ADVISOR)).thenReturn(Collections.singletonList(advisor));
        
        String token = service.generateToken(advisorId);
        Optional<User> found = service.findAdvisorByToken(token);
        
        assertTrue(found.isPresent());
        assertEquals(advisorId, found.get().getId());
    }

    @Test
    void testFindAdvisorByToken_NotFound() {
        when(userRepository.findByRole(UserRole.ADVISOR)).thenReturn(Collections.emptyList());
        Optional<User> found = service.findAdvisorByToken("123456");
        assertFalse(found.isPresent());
    }
}
