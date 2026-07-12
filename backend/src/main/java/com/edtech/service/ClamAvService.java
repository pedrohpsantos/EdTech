package com.edtech.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import xyz.capybara.clamav.ClamavClient;
import xyz.capybara.clamav.commands.scan.result.ScanResult;

import java.io.IOException;

@Service
public class ClamAvService {
    private final ClamavClient clamavClient;

    public ClamAvService (
        @Value("${clamav.host:localhost}") String host,
        @Value("${clamav.port:3310}") int port) {
        this.clamavClient = new ClamavClient(host, port);
    }

    public boolean isFileSafe(MultipartFile file) {
        try {
            ScanResult result = clamavClient.scan(file.getInputStream());
            return result instanceof ScanResult.OK;
        } catch (IOException e) {
            throw new RuntimeException("Failed in extract InputStram from the file to scan.");
        } catch (Exception e) {
            throw new RuntimeException("Failed at the communication with antivirus service.");
        }
    }
}