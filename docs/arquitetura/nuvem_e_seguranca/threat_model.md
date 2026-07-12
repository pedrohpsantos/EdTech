---
title: 'Modelo de Ameaças (STRIDE)'
---

# :material-bug-check: Modelo de Ameaças (STRIDE)

O modelo de ameaças do EdTech utiliza a metodologia STRIDE desenvolvida pela Microsoft. Este documento detalha como nossa arquitetura mitiga ativamente cada uma das seis classes de ameaças.

## 1. Spoofing (Falsificação de Identidade)

**Ameaça:** Um atacante se passa por um usuário legítimo (Pesquisador, Orientador ou Auditor) para acessar o sistema.

**Controles Mitigatórios:**

- **Autenticação JWT Bearer:** As sessões são validadas através de JWT (JSON Web Token) assinados digitalmente.
- **Isolamento de Origem:** Tokens ficam restritos ao `LocalStorage` e não são enviados via Cookies nativos, mitigando roubo via CSRF de forma natural.
- **Força Bruta e Credential Stuffing:** Implementação de limite de taxa (*Rate Limiting*) agressivo via **Bucket4j**. Endpoints sensíveis como `/api/auth/login` admitem no máximo 5 requisições por minuto por endereço IP.

## 2. Tampering (Violação de Dados)

**Ameaça:** Modificação maliciosa de dados em trânsito (rede) ou em repouso (disco/storage).

**Controles Mitigatórios:**

- **HTTPS/TLS Obrigatório:** Todo tráfego entre Cliente, Frontend (Firebase) e Backend (Cloud Run) é criptografado obrigatoriamente (TLS 1.2+).
- **Assinatura JWT (`HMAC SHA-256`):** Modificações na carga útil do token invalidam imediatamente a assinatura criptográfica no backend.
- **Proteção contra Malwares:** Todo documento (PDF) passa por escaneamento em tempo de fluxo usando a **API do ClamAV**. Arquivos infectados são bloqueados antes de atingir o Cloud Storage e descartados com status HTTP 400.
- **Segurança Nativa GCS:** Os buckets do Google Cloud Storage garantem integridade através de validação de checksum MD5 no momento do upload.

## 3. Repudiation (Repúdio)

**Ameaça:** Um usuário realiza uma ação fraudulenta e alega não tê-la feito (ex: aprovar projeto sem consentimento).

**Controles Mitigatórios:**

- **Audit Logs Imutáveis:** Eventos transacionais críticos gravam rastros de auditoria no PostgreSQL. Tabelas de auditoria (via gatilhos ou service layers) são configuradas como apenas inserção (*append-only*).
- **Vínculo Transacional:** Todas as rotas autenticadas capturam o `user_id` originário através do Spring Security Context. Nenhuma ação pode ser executada sob contexto anônimo.
- **Exibição Transparente:** O perfil de Auditor possui acesso em tempo real ao histórico, o que garante a rastreabilidade completa e refutação a repúdios.

## 4. Information Disclosure (Divulgação de Informação)

**Ameaça:** Exposição indevida de dados sensíveis ou informações do sistema para agentes externos.

**Controles Mitigatórios:**

- **Rede VPC Isolada:** O Cloud SQL não tem endereço IP público. Ele apenas aceita tráfego da Virtual Private Cloud (VPC) proveniente do Cloud Run através do Cloud SQL Auth Proxy.
- **Acesso Temporário a Arquivos:** Os documentos do GCS não são expostos publicamente. O download é garantido através da emissão de **URLs Assinadas (Signed URLs)** com curta validade, emitidas unicamente pelo Backend para usuários autenticados.
- **Sanitização de Pilhas de Erro:** Exceções não expõem detalhes do stacktrace no corpo de respostas HTTP, sendo tratados uniformemente no `GlobalExceptionHandler`.

## 5. Denial of Service (Negação de Serviço - DoS)

**Ameaça:** Interrupção proposital da disponibilidade do sistema inundando-o de requisições.

**Controles Mitigatórios:**

- **Escalonamento Automático Serverless:** O Cloud Run dimensiona instâncias automaticamente a partir de zero, suportando um alto pico de requisições paralelas e isolando CPU e Memória por requisição.
- **Defesas Borda do Google (WAF):** Proteção nativa no Cloud Load Balancing e Firebase Hosting contra ataques DDoS volumétricos (Layer 3/4).
- **Bucket4j de Borda:** Proteção extra na camada de aplicação bloqueando spamers locais que passem do WAF.

## 6. Elevation of Privilege (Elevação de Privilégio)

**Ameaça:** Um atacante ou usuário comum explora vulnerabilidades para executar ações como administrador ou outro perfil.

**Controles Mitigatórios:**

- **RBAC Estrito (Role-Based Access Control):**
    - Pesquisadores (`researcher`) apenas submetem relatórios e navegam nos próprios arquivos.
    - Orientadores (`advisor`) revisam apenas artefatos atrelados ao seu próprio escopo.
    - Auditores (`auditor`) têm privilégio estrito de **leitura** (Read-Only) nos logs globais.
- **Prevenção contra XSS:** Renderização segura de HTML através do ecossistema React.
- **Arquitetura Zero-Trust Interna:** O Cloud Run possui uma Service Account exclusiva e restrita no IAM do GCP para acessar apenas os buckets e bancos de que precisa (Princípio do Menor Privilégio).

---

Este documento será validado anualmente no ciclo de Governança de Segurança e após implantação de novos épicos massivos arquiteturais.

## Histórico de Versões

| Versão |    Data    | Descrição                                | Autor                    |
| :---: | :---: | :--- | :--- |
| `1.0`  | 12/07/2026 | Criação do documento (Issue #163)        | Pedro Henrique P. Santos |
