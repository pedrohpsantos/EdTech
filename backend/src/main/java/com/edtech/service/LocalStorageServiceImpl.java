package com.edtech.service;

import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/** Documentação para LocalStorageServiceImpl. */
@Service
@ConditionalOnProperty(name = "storage.provider", havingValue = "local")
public class LocalStorageServiceImpl implements StorageService {
  private static final Logger log = LoggerFactory.getLogger(LocalStorageServiceImpl.class);

  @Override
  public void uploadFile(MultipartFile file, String fileKey, String contentType) throws Exception {
    log.info("Simulando upload local do arquivo {}", fileKey);
  }

  @Override
  public String getPresignedUrl(String fileKey) throws Exception {
    return "http://localhost:8080/local-storage-mock/" + fileKey + "?token=" + UUID.randomUUID();
  }

  @Override
  public void deleteFile(String fileKey) throws Exception {
    log.info("Simulando delete local do arquivo {}", fileKey);
  }
}
