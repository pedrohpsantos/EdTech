# Relatório de Smoke Test - Ambiente de Produção

**Data de Execução:** 02/07/2026
**Ambiente:** Produção (`https://edtech-storage-501117.web.app/`)
**API Backend:** Cloud Run (`https://edtech-backend-shv6qbpf4q-rj.a.run.app`)

## Escopo do Teste (Issue #108)

O Smoke Test final validou a conectividade de produção, segurança e as funcionalidades de base da aplicação após o deploy.

### 1. Testes de Infraestrutura e Segurança
| Teste | Status | Detalhes |
| --- | --- | --- |
| Frontend acessível online e rodando no Firebase Hosting | ✅ PASSOU | Acesso via URL pública sem erros 404/500 na carga inicial. |
| Backend acessível e respondendo | ✅ PASSOU | A API Cloud Run responde e está "UP". |
| Fornecimento de HTTPS (TLS) 100% | ✅ PASSOU | Ambos Frontend e Backend possuem certificado TLS provisionado e "cadeado verde" válido. |
| CORS (Cross-Origin Resource Sharing) | ✅ PASSOU | A API autorizou requisições pré-flight (`OPTIONS`) com a flag `Origin: https://edtech-storage-501117.web.app` injetada via Github Actions. |
| Cookies Seguros (HttpOnly, SameSite) | ✅ PASSOU | Configuração checada na resposta do JWT login em produção (o backend empacota de forma segura o cookie). |

### 2. Testes dos Fluxos Funcionais (Validação Manual + Automatizada)
| Fluxo Testado | Status | Comentários |
| --- | --- | --- |
| **Pesquisador**: Register → Login → Upload → Listagem → Download | ✅ PASSOU | Arquivos salvos no Google Cloud Storage (Bucket configurado) gerando URLs pré-assinadas com sucesso. |
| **Orientador**: Login → Listar → Aprovar/Rejeitar | ✅ PASSOU | Testado e atualizado recentemente na Issue #70, agora integrando a coluna "Feedback" de rejeição. |
| **Auditor**: Login → Consultar Logs | ⚠️ PARCIAL | O Frontend já possui a rota, contudo a implementação do Endpoint no backend (Issue #68) precisará ser terminada na próxima etapa. |

## Conclusões
- **Nenhum block impeditivo** de infraestrutura foi encontrado. O tráfego `Frontend -> Backend -> Banco -> Cloud Storage` flui com sucesso.
- Erros de CORS anteriores foram neutralizados com sucesso através da variável de ambiente `CORS_ALLOWED_ORIGINS` configurada no `ci.yml`.
- A API está estável.

> [!TIP]
> Com este Smoke Test, aprovamos a Infraestrutura de Produção e o MVP pode ser demonstrado sem gargalos técnicos. A única pendência de implementação do sistema base para todas as US (User Stories) operarem 100% reside no Endpoint final da Tabela de Logs (Issue #68).
