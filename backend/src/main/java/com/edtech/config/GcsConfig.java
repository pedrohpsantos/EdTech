package com.edtech.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import java.io.FileInputStream;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/** Documentação para GcsConfig. */
@Configuration
@Profile("!test")
public class GcsConfig {

  @Value("${gcp.project-id}")
  private String projectId;

  @Value("${gcp.credentials-location}")
  private String credentialsLocation;

  /** Documentação. */
  @Bean
  public Storage googleCloudStorage() throws IOException {
    GoogleCredentials credentials;
    if (credentialsLocation != null && !credentialsLocation.isEmpty()) {
      credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsLocation));
    } else {
      credentials = GoogleCredentials.getApplicationDefault();
    }

    return StorageOptions.newBuilder()
        .setProjectId(projectId)
        .setCredentials(credentials)
        .build()
        .getService();
  }
}
