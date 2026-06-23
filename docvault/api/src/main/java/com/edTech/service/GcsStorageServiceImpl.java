package com.edTech.service;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.util.concurrent.TimeUnit;

@Service
@ConditionalOnProperty(name = "storage.provider", havingValue = "gcs")
public class GcsStorageServiceImpl implements StorageService {

    private final Storage storage;

    @Value("${gcp.bucket}")
    private String bucketName;

    public GcsStorageServiceImpl(Storage storage) {
        this.storage = storage;
    }

    @Override
    public void uploadFile(MultipartFile file, String fileKey, String contentType) throws Exception {
        BlobId blobId = BlobId.of(bucketName, fileKey);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(contentType)
                .build();
        storage.create(blobInfo, file.getBytes());
    }

    @Override
    public String getPresignedUrl(String fileKey) throws Exception {
        BlobId blobId = BlobId.of(bucketName, fileKey);
        URL signedUrl = storage.signUrl(
                blobInfoForPresigned(blobId),
                15, TimeUnit.MINUTES,
                Storage.SignUrlOption.withV4Signature()
        );
        return signedUrl.toString();
    }

    private BlobInfo blobInfoForPresigned(BlobId blobId) {
        return BlobInfo.newBuilder(blobId).build();
    }
}
