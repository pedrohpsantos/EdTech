package com.edtech.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * Força o encerramento do Cloud Run Job de migração do banco de dados após a
 * inicialização do
 * contexto (e execução do Flyway).
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class MigrationExitRunner implements CommandLineRunner {

  @Value("${spring.main.web-application-type:servlet}")
  private String webAppType;

  @Override
  public void run(String... args) {
    if ("none".equalsIgnoreCase(webAppType)) {
      System.out.println(
          "Migration Cloud Run Job concluído com sucesso. Forçando saída para evitar timeout...");
      System.exit(0);
    }
  }
}
