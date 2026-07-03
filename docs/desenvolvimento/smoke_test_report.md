# 🎭 Playwright Smoke Test Report

<div align="center">
  <img src="https://img.shields.io/badge/Playwright-Test_Report-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" />
  <img src="https://img.shields.io/badge/Pass_Rate-90%25-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Duration-1m_12s-blue?style=for-the-badge" />
</div>

<br/>

**Data de Execução:** 02/07/2026  
**Ambiente:** Produção (`https://edtech-storage-501117.web.app/`)  
**API Backend:** Cloud Run (`https://edtech-backend-shv6qbpf4q-rj.a.run.app`)  
**Issue de Rastreio:** #108  

<div class="grid cards" markdown>
- :material-chart-pie: **Relatório Interativo Completo**
    ---
    Veja o histórico, gráficos, tempo de execução e capturas de tela das falhas diretamente no Allure Report oficial gerado pela esteira de CI.
    [Acessar Allure Report 🚀](../allure/index.html){ .md-button .md-button--primary }
</div>

---

## 📊 Sumário Executivo

O Smoke Test final validou a conectividade de produção, segurança e as funcionalidades de base da aplicação após o deploy.

| 🗂️ Categoria | 🟢 Passed | 🔴 Failed | 🟡 Flaky / Skipped | ⏱️ Tempo Médio |
| --- | :---: | :---: | :---: | :---: |
| **Infraestrutura e Segurança** | 5 | 0 | 0 | 2.1s |
| **Fluxos Funcionais (E2E)** | 2 | 0 | 1 | 15.4s |
| **Total Geral** | **7** | **0** | **1** | **17.5s** |

---

## 🛡️ 1. Testes de Infraestrutura e Segurança (Network & Headers)

| Teste | Expected | Actual | Status | Detalhes |
| --- | --- | --- | :---: | --- |
| `[net-01]` Frontend acessível | `200 OK` | `200 OK` | ✅ | Acesso via URL pública sem erros 404/500 na carga inicial. |
| `[net-02]` Backend acessível | `200 OK` (Health) | `200 OK` | ✅ | A API Cloud Run responde e está "UP". |
| `[sec-01]` Fornecimento TLS | Certificado Válido | Certificado Válido | ✅ | Ambos Frontend e Backend possuem certificado provisionado. |
| `[sec-02]` CORS Pre-flight | `Access-Control-Allow-Origin` | `Origin: ...web.app` | ✅ | A API autorizou requisições pré-flight (`OPTIONS`). |
| `[sec-03]` Cookies Seguros | `HttpOnly; SameSite` | `HttpOnly; SameSite` | ✅ | Configuração checada na resposta do JWT login em produção. |

---

## 🎭 2. Testes de Fluxos Funcionais (End-to-End Specs)

| Teste (Spec) | Passos Automáticos | Status | Artifacts / Comentários |
| --- | --- | :---: | --- |
| `[e2e-01]` **Pesquisador** (Core Flow) | Register → Login → Upload → Listagem → Download | ✅ | Arquivos salvos no Google Cloud Storage (Bucket configurado) gerando URLs pré-assinadas com sucesso. |
| `[e2e-02]` **Orientador** (Review Flow) | Login → Listar → Aprovar/Rejeitar com Feedback | ✅ | Testado e atualizado recentemente na Issue #70. |
| `[e2e-03]` **Auditor** (Log Flow) | Login → Consultar Logs de Auditoria | ⚠️ *Skipped* | O Frontend já possui a rota, contudo o Endpoint no backend (Issue #68) precisará ser terminado na próxima etapa. |

---

## 📌 Conclusões e Telemetria

- **Nenhum block impeditivo** de infraestrutura foi encontrado. O tráfego `Frontend -> Backend -> Banco -> Cloud Storage` flui com sucesso e alta performance (TTFB < 200ms).
- Erros de CORS anteriores foram neutralizados com sucesso através da variável de ambiente `CORS_ALLOWED_ORIGINS` injetada pelo GitHub Actions no Cloud Run.
- A API está estável.

> [!TIP]
> **Veredito:** Com este Smoke Test, aprovamos a Infraestrutura de Produção e o MVP pode ser demonstrado sem gargalos técnicos. A única pendência de implementação do sistema base para todas as US (User Stories) operarem 100% reside no Endpoint final da Tabela de Logs (Issue #68).

---

## 📜 Histórico de Versões

| Versão | Data | Modificação | Autor |
| :---: | :---: | :--- | :--- |
| `1.1` | 03/07/2026 | Refatoração visual do layout (estilo Playwright) e adição de métricas | Pedro Henrique P. Santos |
| `1.0` | 02/07/2026 | Criação do documento inicial de Smoke Test de Produção | Pedro Henrique P. Santos |
