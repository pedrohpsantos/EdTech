---
title: 'ADR 0011: Envio de E-mails Transacionais (Recuperação de Senha) via SMTP'
---

# :material-text-box-check: ADR 0011: Envio de E-mails Transacionais (Recuperação de Senha) via SMTP

## Status

Aceito

## Contexto

A plataforma EdTech exige uma governança rígida e trilhas de auditoria. Para a funcionalidade de "Esqueci minha senha", não é aceitável que o usuário simplesmente troque a senha sem uma validação de propriedade da conta.
Precisamos enviar um código de segurança (OTP - One Time Password) de 6 dígitos para o e-mail institucional do usuário. O backend Java (Spring Boot) precisa disparar estes e-mails de forma confiável e assíncrona.

## Decisão

Adotaremos o `spring-boot-starter-mail`, que abstrai o envio de e-mails usando a interface `JavaMailSender` nativa do Spring.

- O protocolo utilizado será o SMTP.
- As credenciais SMTP (`host`, `port`, `username`, `password`) serão obrigatoriamente injetadas via variáveis de ambiente para não comprometer dados sensíveis no repositório.
- Para o ambiente de desenvolvimento local, a recomendação oficial é utilizar o **Mailtrap** (SMTP Mock Server), evitando disparos reais acidentais para e-mails de clientes.

## Consequências

- **Positivas:** 
  - `spring-boot-starter-mail` é leve, amplamente suportado e fácil de configurar.
  - O código não fica acoplado a uma API REST proprietária de envio (como SendGrid API ou AWS SES API), sendo possível trocar de provedor apenas alterando propriedades SMTP.
- **Negativas:** 
  - Envio SMTP síncrono pode causar lentidão (gargalo) na resposta da API se o servidor de e-mail demorar a responder. **Mitigação futura:** O serviço de envio de e-mail pode ser anotado com `@Async` e executado em uma TaskExecutor pool paralela, ou jogado em uma fila de mensageria (RabbitMQ/Kafka) futuramente. Por enquanto, será síncrono para validação da prova de conceito.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 28/06/2026 | Documento de Registro de Decisão Arquitetural (Envio de E-mails Transacionais) | Pedro Henrique P. Santos |
| `1.1` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |


