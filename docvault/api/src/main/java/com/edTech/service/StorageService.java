package com.edTech.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    void uploadFile(MultipartFile file, String fileKey, String contentType) throws Exception;
    String getPresignedUrl(String fileKey) throws Exception;
    void deleteFile(String fileKey) throws Exception;
}
