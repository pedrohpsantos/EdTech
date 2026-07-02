package com.edTech.repository;

import com.edTech.model.RecoveryToken;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class RecoveryTokenRepositoryTest {

    @Autowired
    private RecoveryTokenRepository repository;

    @Test
    void testSaveAndFindByEmailAndToken() {
        // Arrange
        RecoveryToken token = new RecoveryToken("123456", "teste@unb.br", LocalDateTime.now().plusMinutes(15));
        repository.save(token);

        // Act
        Optional<RecoveryToken> found = repository.findByEmailAndToken("teste@unb.br", "123456");

        // Assert
        assertTrue(found.isPresent());
        assertEquals("teste@unb.br", found.get().getEmail());
        assertEquals("123456", found.get().getToken());
    }

    @Test
    void testDeleteByEmail() {
        // Arrange
        RecoveryToken token = new RecoveryToken("123456", "teste@unb.br", LocalDateTime.now().plusMinutes(15));
        repository.save(token);
        assertTrue(repository.findByEmailAndToken("teste@unb.br", "123456").isPresent());

        // Act
        repository.deleteByEmail("teste@unb.br");

        // Assert
        assertFalse(repository.findByEmailAndToken("teste@unb.br", "123456").isPresent());
    }
}
