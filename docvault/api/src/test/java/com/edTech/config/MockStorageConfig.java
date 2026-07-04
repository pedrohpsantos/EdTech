package com.edTech.config;

import com.google.cloud.storage.Storage;
import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("test")
public class MockStorageConfig {

  @Bean
  @Primary
  public Storage googleCloudStorage() {
    return Mockito.mock(Storage.class);
  }
}
