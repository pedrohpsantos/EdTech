package com.edtech.service;

import com.edtech.model.AuditLog;
import com.opencsv.CSVWriter;
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

    try (
        OutputStreamWriter writer =
            new OutputStreamWriter(outputStream, StandardCharsets.UTF_8);
        CSVWriter csvWriter = new CSVWriter(writer)) {

      csvWriter.writeNext(
          new String[] {
            "data_hora", "usuario_id", "acao", "tipo_recurso", "id_recurso", "ip", "detalhes"
          });

      for (AuditLog log : logs) {
        csvWriter.writeNext(
            new String[] {
              log.getCreatedAt() != null ? log.getCreatedAt().toString() : "",
              log.getUserId() != null ? log.getUserId().toString() : "",
              log.getAction() != null ? log.getAction().name() : "",
              log.getResourceType() != null ? log.getResourceType() : "",
              log.getResourceId() != null ? log.getResourceId().toString() : "",
              log.getIpAddress() != null ? log.getIpAddress() : "",
              log.getDetails() != null ? log.getDetails() : ""
            });
      }

      csvWriter.flush();
      return outputStream.toByteArray();
    } catch (Exception e) {
      throw new RuntimeException("Falha ao gerar CSV da trilha de auditoria", e);
    }
  }
}
