package com.edtech.service;

import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

  @Mock private SimpMessagingTemplate messagingTemplate;

  @InjectMocks private NotificationService notificationService;

  @Test
  void sendToUser_WhenTemplateIsNotNull_ShouldSend() {
    notificationService.sendToUser("user123", "payload");
    verify(messagingTemplate, times(1))
        .convertAndSendToUser("user123", "/queue/notifications", "payload");
  }

  @Test
  void sendToUser_WhenTemplateIsNull_ShouldNotSend() {
    NotificationService serviceWithNullTemplate = new NotificationService(null);
    serviceWithNullTemplate.sendToUser("user123", "payload");
  }

  @Test
  void sendToTopic_WhenTemplateIsNotNull_ShouldSend() {
    notificationService.sendToTopic("/topic/global", "payload");
    verify(messagingTemplate, times(1)).convertAndSend("/topic/global", "payload");
  }

  @Test
  void sendToTopic_WhenTemplateIsNull_ShouldNotSend() {
    NotificationService serviceWithNullTemplate = new NotificationService(null);
    serviceWithNullTemplate.sendToTopic("/topic/global", "payload");
  }
}
