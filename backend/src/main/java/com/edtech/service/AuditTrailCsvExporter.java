package com.edtech.service;

import com.edtech.model.AuditLog;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.springframework.stereotype.Component;

/** Transforma logs de auditoria em arquivos CSV. */
@Component
public class AuditTrailCsvExporter {

  /**
   * Gera um CSV em memoria com os principais dados da trilha de auditoria.
   *
   * @param logs logs que devem ser exportados.
   * @return conteudo do arquivo CSV em bytes.
   */
  public byte[] export(List<AuditLog> logs) {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

    try (OutputStreamWriter writer = new OutputStreamWriter(outputStream, StandardCharsets.UTF_8)) {

      writeRow(
          writer,
          "data_hora",
          "usuario_id",
          "acao",
          "tipo_recurso",
          "id_recurso",
          "ip",
          "detalhes");

      for (AuditLog log : logs) {
        writeRow(
            writer,
            log.getCreatedAt() != null ? log.getCreatedAt().toString() : "",
            log.getUserId() != null ? log.getUserId().toString() : "",
            log.getAction() != null ? log.getAction().name() : "",
            log.getResourceType() != null ? log.getResourceType() : "",
            log.getResourceId() != null ? log.getResourceId().toString() : "",
            log.getIpAddress() != null ? log.getIpAddress() : "",
            log.getDetails() != null ? log.getDetails() : "");
      }

      writer.flush();
      return outputStream.toByteArray();
    } catch (Exception e) {
      throw new RuntimeException("Falha ao gerar CSV da trilha de auditoria", e);
    }
  }

  private void writeRow(OutputStreamWriter writer, String... values) throws java.io.IOException {
    for (int index = 0; index < values.length; index++) {
      if (index > 0) {
        writer.write(",");
      }
      writer.write(escape(values[index]));
    }
    writer.write("\r\n");
  }

  private String escape(String value) {
    String safeValue = value != null ? value : "";
    // Prevent CSV formula injection (CWE-1236)
    if (!safeValue.isEmpty()) {
      char first = safeValue.charAt(0);
      if (first == '=' || first == '+' || first == '-' || first == '@'
          || first == '\t' || first == '\r') {
        safeValue = "'" + safeValue;
      }
    }
    if (safeValue.contains("\"")
        || safeValue.contains(",")
        || safeValue.contains("\n")
        || safeValue.contains("\r")) {
      return "\"" + safeValue.replace("\"", "\"\"") + "\"";
    }
    return safeValue;
  }
}
