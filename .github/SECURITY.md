# 🔒 Política de Segurança do EdTech

![Security Level](https://img.shields.io/badge/Security-Maximum-red?style=for-the-badge&logo=springsecurity)
![SWAT](https://img.shields.io/badge/Response_Team-Active-black?style=for-the-badge)

> *"Atenção! Você entrou na área restrita. Nós somos o Time SWAT deste projeto. Nossa missão não é debater arquitetura ou design de botões, nossa missão é evitar que dados acadêmicos sensíveis caiam nas mãos erradas. Se você encontrou uma brecha nas defesas, fique calmo, não grite em público e siga os protocolos de extração silenciosa detalhados abaixo. Nós resolvemos rápido e resolvemos pesado."* 🚁

A segurança dos dados é a fundação do EdTech. Por tratarmos de relatórios científicos, dados de laboratórios e auditorias institucionais, levamos vulnerabilidades extremamente a sério.

## 🛡️ Versões Suportadas

Nós fornecemos atualizações e patches de segurança ativamente para as versões listadas abaixo. Se você estiver usando uma versão não suportada, faça o upgrade imediatamente.

| Versão | Suportada? |
| :---: | :---: |
| >= 1.0.x | ✅ Sim |
| < 1.0.0 (Betas) | ❌ Não |

---

## 🚨 Como Reportar uma Vulnerabilidade (Protocolo Silencioso)

**ATENÇÃO: NUNCA crie uma Issue pública no GitHub para reportar uma vulnerabilidade crítica de segurança.** Fazer isso expõe a falha (Zero-Day) antes que possamos criar um patch, colocando o sistema em risco imediato.

Se você encontrou uma vulnerabilidade, siga os passos de extração:

1. **Gere um Relatório Tático:** Descreva o problema, o impacto, os passos para reproduzir a falha e, se possível, sugira uma mitigação ou um PoC (Proof of Concept).
2. **Envio Confidencial:** Utilize a aba [Security Advisories](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) do próprio GitHub no repositório EdTech para submeter um reporte privado. 
3. Se não encontrar o botão no GitHub, mande um sinal cifrado por e-mail para a nossa liderança de segurança: `security@edtech.invalid`.

### O Que Acontece Depois?

- **Recepção:** A SWAT acusará o recebimento do seu reporte em até 48 horas.
- **Investigação:** Avaliaremos a gravidade, escopo e impacto (CVSS).
- **Patch:** Desenvolveremos o patch e faremos o deploy silenciosamente nos sistemas em produção.
- **Reconhecimento:** Se a vulnerabilidade for válida e inédita, faremos um anúncio público de segurança creditando você pelo achado (se você desejar).

Nós agradecemos seu esforço de chapéu-branco (*white-hat*) para manter nossa comunidade segura. Câmbio, desligo! 🔫
