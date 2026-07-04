package com.edtech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/** Documentação para EdTechApplication. */
@SpringBootApplication
@EnableAsync
public class EdTechApplication {

  /** Documentação para o método main. */
  public static void main(String[] args) {
    SpringApplication.run(EdTechApplication.class, args);
  }
}
