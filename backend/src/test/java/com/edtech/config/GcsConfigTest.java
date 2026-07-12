package com.edtech.config;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class GcsConfigTest {

  @Test
  void testGoogleCloudStorageWithInvalidCredentials() {
    GcsConfig config = new GcsConfig();
    ReflectionTestUtils.setField(config, "projectId", "test-project");
    ReflectionTestUtils.setField(config, "credentialsLocation", "invalid/path/to/credentials.json");

    // Should throw IOException because the file doesn't exist
    assertThrows(IOException.class, () -> config.googleCloudStorage());
  }
}
