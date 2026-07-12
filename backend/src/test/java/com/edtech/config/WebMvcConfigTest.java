package com.edtech.config;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;

import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

class WebMvcConfigTest {

  @Test
  void testAddResourceHandlers() {
    WebMvcConfig config = new WebMvcConfig();
    ResourceHandlerRegistry registry = mock(ResourceHandlerRegistry.class);

    // Config shouldn't add anything right now (Mitigation SEC-001)
    config.addResourceHandlers(registry);
    verifyNoInteractions(registry);
  }
}
