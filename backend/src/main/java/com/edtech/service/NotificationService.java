package com.edtech.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/** Javadoc. */
@Service
public class NotificationService {

  private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);
  private final SimpMessagingTemplate messagingTemplate;

  public NotificationService(
      @org.springframework.beans.factory.annotation.Autowired(required = false)
          SimpMessagingTemplate messagingTemplate) {
    this.messagingTemplate = messagingTemplate;
  }

  /**
   * Envia uma notificação em tempo real (WebSocket) para um usuário específico.
   *
   * @param userId O ID do usuário (como String)
   * @param payload O conteúdo da mensagem
   */
  public void sendToUser(String userId, Object payload) {
    if (messagingTemplate == null) return;
    String destination = "/queue/notifications";
    logger.info("Enviando notificacao WS para o usuario {}: {}", userId, payload);
    messagingTemplate.convertAndSendToUser(userId, destination, payload);
  }

  /**
   * Envia uma notificação para um tópico geral.
   *
   * @param topic O tópico de destino (ex: /topic/global)
   * @param payload O conteúdo da mensagem
   */
  public void sendToTopic(String topic, Object payload) {
    if (messagingTemplate == null) return;
    logger.info("Enviando notificacao WS global para o topico {}: {}", topic, payload);
    messagingTemplate.convertAndSend(topic, payload);
  }
}
