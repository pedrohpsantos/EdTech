---
title: 'Manual do Usuário'
---

# :material-book-account: Manual do Usuário e Fluxos

Este manual detalha o funcionamento da plataforma EdTech a partir da perspectiva de cada um dos perfis de usuário (Personas).

---

## 1. Fluxo do Pesquisador (Aluno/Pesquisador)

O **Pesquisador** é o usuário principal que envia documentos acadêmicos para a plataforma.

### 1.1 Cadastro e Login
Para iniciar, o pesquisador deve realizar seu cadastro informando e-mail, senha e nome completo. Após a confirmação, ele é redirecionado para a tela de login.

### 1.2 Upload de Documentos
Na tela de envio (Upload), o pesquisador pode selecionar um arquivo PDF (Tese, Artigo, Dataset) e vinculá-lo a um Projeto.

![Upload de Documentos](../assets/imgs/pesquisador_upload.png)

> [!TIP]
> Apenas documentos em PDF e planilhas CSV/XLSX são permitidos no momento. Arquivos executáveis serão rejeitados pela auditoria de segurança de upload.

---

## 2. Fluxo do Orientador (Professor/Gestor)

O **Orientador** é o usuário responsável por validar as entregas do Pesquisador e assegurar a qualidade científica.

### 2.1 Dashboard de Acompanhamento
O painel do orientador apresenta métricas executivas, como a quantidade de documentos pendentes de revisão e o score de conformidade dos projetos em andamento.

![Dashboard do Orientador](../assets/imgs/orientador_dashboard.png)

### 2.2 Aprovação de Documentos
Acessando a lista de documentos em revisão, o Orientador pode visualizar um *preview* rápido do arquivo e utilizar os botões de ação para **Aprovar**, **Solicitar Alterações** ou **Rejeitar**.

> [!WARNING]
> Uma vez aprovado, o documento é selado no banco de dados com um hash SHA-256 e qualquer modificação futura gerará uma nova versão.

---

## 3. Fluxo do Auditor (Membro LGPD/Comitê Ética)

O **Auditor** possui acesso exclusivo e restrito apenas à visão de rastreabilidade do sistema.

### 3.1 Tabela de Logs e Rastreabilidade
O Auditor pode pesquisar qualquer evento que tenha ocorrido no ciclo de vida de um documento, incluindo visualizações, downloads, edições de metadados e aprovações.

![Painel do Auditor](../assets/imgs/auditor_logs.png)

### 3.2 Exportação de Trilha de Auditoria
A tabela permite aplicar filtros por intervalo de data, usuário e tipo de ação. Posteriormente, a tabela pode ser exportada para auditorias externas (compliance).

> [!NOTE]
> Os logs não podem ser apagados ou modificados nem por usuários com perfil de Administrador.
