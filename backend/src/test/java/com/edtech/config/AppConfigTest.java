package com.edtech.config;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

class AppConfigTest {

  @Test
  void testPasswordEncoderBean() {
    AppConfig appConfig = new AppConfig();
    PasswordEncoder encoder = appConfig.passwordEncoder();
    assertNotNull(encoder);
    // BCryptPasswordEncoder generates hashes starting with $2a$ (or similar)
    String encoded = encoder.encode("password");
    assertTrue(encoded.startsWith("$2a$"));
  }

  @Test
  void testUserDetailsServiceBean() {
    AppConfig appConfig = new AppConfig();
    InMemoryUserDetailsManager manager = appConfig.userDetailsService();
    assertNotNull(manager);
  }
}
