# Política de Segurança

A segurança dos dados é um requisito central do EdTech. Por lidar com relatórios científicos, dados de laboratórios e registros de auditoria institucional, vulnerabilidades são tratadas com prioridade máxima.

## Versões Suportadas

Patches de segurança são fornecidos exclusivamente para as versões listadas abaixo:

| Versão | Suportada |
| :---: | :---: |
| >= 1.0.x | ✅ Sim |
| < 1.0.0 (pré-lançamento) | ❌ Não |

---

## Como Reportar uma Vulnerabilidade

> **Não crie uma Issue pública no GitHub para reportar vulnerabilidades de segurança.** Divulgação pública prematura pode expor usuários antes que um patch seja disponibilizado.

Para reportar uma vulnerabilidade de forma responsável:

1. **Descreva o problema** com o máximo de detalhes possível: impacto estimado, passos para reprodução e, se disponível, uma prova de conceito (PoC) ou sugestão de mitigação.

2. **Submeta via GitHub Security Advisories:** Utilize a funcionalidade de [reporte privado de vulnerabilidades](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) diretamente neste repositório.

3. **Canal alternativo:** Se o reporte privado não estiver habilitado, contate um mantenedor por canal privado previamente acordado. Não publique detalhes exploráveis em issue, PR ou discussão.

---

## Processo de Resposta

| Etapa | Prazo |
| :--- | :--- |
| Confirmação de recebimento | até 48 horas |
| Avaliação de gravidade (CVSS) | até 5 dias úteis |
| Desenvolvimento e deploy do patch | variável conforme severidade |
| Divulgação pública coordenada | após a correção estar disponível |

Vulnerabilidades válidas e inéditas serão reconhecidas publicamente no aviso de segurança, com crédito ao reportante caso desejado.

---

## Escopo

São consideradas dentro do escopo desta política vulnerabilidades que afetem diretamente:

- A API do backend (`/api/**`)
- O mecanismo de autenticação e autorização (JWT, RBAC)
- O armazenamento de arquivos no GCS
- A integridade da trilha de auditoria
