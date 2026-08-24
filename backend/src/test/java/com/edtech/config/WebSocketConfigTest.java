package com.edtech.config;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.StompWebSocketEndpointRegistration;

class WebSocketConfigTest {

  @Test
  void testConfigureMessageBroker() {
    WebSocketConfig config = new WebSocketConfig();
    org.springframework.test.util.ReflectionTestUtils.setField(config, "allowedOrigins", "*");
    MessageBrokerRegistry registry = mock(MessageBrokerRegistry.class);

    when(registry.enableSimpleBroker(anyString(), anyString())).thenReturn(null);
    when(registry.setApplicationDestinationPrefixes(anyString())).thenReturn(registry);
    when(registry.setUserDestinationPrefix(anyString())).thenReturn(registry);

    config.configureMessageBroker(registry);

    verify(registry).enableSimpleBroker("/topic", "/queue");
    verify(registry).setApplicationDestinationPrefixes("/app");
    verify(registry).setUserDestinationPrefix("/user");
  }

  @Test
  void testRegisterStompEndpoints() {
    WebSocketConfig config = new WebSocketConfig();
    org.springframework.test.util.ReflectionTestUtils.setField(config, "allowedOrigins", "*");
    StompEndpointRegistry registry = mock(StompEndpointRegistry.class);
    StompWebSocketEndpointRegistration registration = mock(StompWebSocketEndpointRegistration.class);

    when(registry.addEndpoint("/ws-edtech")).thenReturn(registration);
    when(registration.setAllowedOriginPatterns("*")).thenReturn(registration);

    config.registerStompEndpoints(registry);

    verify(registry).addEndpoint("/ws-edtech");
    verify(registration).setAllowedOriginPatterns("*");
    verify(registration).withSockJS();
  }
}
