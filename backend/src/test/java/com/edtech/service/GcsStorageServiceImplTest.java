package com.edtech.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import java.net.URI;
import java.net.URL;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

class GcsStorageServiceImplTest {

  private Storage storage;
  private GcsStorageServiceImpl service;

  @BeforeEach
  void setUp() throws Exception {
    storage = mock(Storage.class);
    service = new GcsStorageServiceImpl(storage);
    java.lang.reflect.Field bucketNameField =
        GcsStorageServiceImpl.class.getDeclaredField("bucketName");
    bucketNameField.setAccessible(true);
    bucketNameField.set(service, "test-bucket");
  }

  @Test
  void testUploadFile() throws Exception {
    MockMultipartFile file =
        new MockMultipartFile("file", "hello.txt", "text/plain", "Hello World".getBytes());
    service.uploadFile(file, "hello.txt", "text/plain");

    verify(storage).create(any(BlobInfo.class), eq("Hello World".getBytes()));
  }

  @Test
  void testGetPresignedUrl() throws Exception {
    URL mockUrl = URI.create("http://localhost/test").toURL();
    when(storage.signUrl(
            any(BlobInfo.class), eq(15L), eq(TimeUnit.MINUTES), any(Storage.SignUrlOption.class)))
        .thenReturn(mockUrl);

    String url = service.getPresignedUrl("hello.txt");
    assertNotNull(url);
    assertEquals("http://localhost/test", url);
  }

  @Test
  void testDeleteFile() throws Exception {
    service.deleteFile("hello.txt");

    verify(storage).delete(any(BlobId.class));
  }
}
