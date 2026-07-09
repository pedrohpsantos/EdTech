package com.edtech.service;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.edtech.model.AcaoAuditoria;
import com.edtech.model.AuditLog;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class AuditTrailCsvExporterTest {

  private final AuditTrailCsvExporter exporter = new AuditTrailCsvExporter();

  @Test
  void exportEscapesCsvSpecialCharacters() {
    UUID userId = UUID.randomUUID();
    UUID resourceId = UUID.randomUUID();
    AuditLog log =
        new AuditLog(
            userId,
            AcaoAuditoria.DOWNLOAD,
            "Document",
            resourceId,
            "127.0.0.1",
            "linha, \"dois\"\nquebra");

    String csv = new String(exporter.export(List.of(log)), StandardCharsets.UTF_8);

    assertTrue(
        csv.startsWith("data_hora,usuario_id,acao,tipo_recurso,id_recurso,ip,detalhes\r\n"));
    assertTrue(csv.contains(userId.toString()));
    assertTrue(csv.contains(resourceId.toString()));
    assertTrue(csv.endsWith("\"linha, \"\"dois\"\"\nquebra\"\r\n"));
  }
}
