package com.edtech.service;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import xyz.capybara.clamav.ClamavClient;
import xyz.capybara.clamav.commands.scan.result.ScanResult;

/**
 * Service for malware scanning using ClamAV.
 */
@Service
public class ClamAvService {
  private final ClamavClient clamavClient;

  /**
   * Initializes the ClamAV client.
   *
   * @param host ClamAV host
   * @param port ClamAV port
   */
  public ClamAvService(
      @Value("${clamav.host:localhost}") String host,
      @Value("${clamav.port:3310}") int port) {
    this.clamavClient = new ClamavClient(host, port);
  }

  /**
   * Scans a file for malware.
   *
   * @param file The file to scan
   * @return true if the file is safe, false otherwise
   */
  public boolean isFileSafe(MultipartFile file) {
    try {
      ScanResult result = clamavClient.scan(file.getInputStream());
      return result instanceof ScanResult.OK;
    } catch (IOException e) {
      throw new RuntimeException("Failed to extract InputStream from the file to scan.");
    } catch (Exception e) {
      throw new RuntimeException("Failed at the communication with antivirus service.");
    }
  }
}