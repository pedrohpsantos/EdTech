# Coleção Postman e Testes de API

![Postman](https://img.shields.io/badge/Postman-API_Testing-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![REST API](https://img.shields.io/badge/API-RESTful-005571?style=for-the-badge)

Este diretório (`/.postman`) contém a coleção oficial para iteração manual, depuração e validação de contratos da API do EdTech. Ele permite que desenvolvedores reproduzam requisições sistêmicas contra a aplicação sem necessidade de desenvolver scripts dedicados.

## Escopo da Coleção

O arquivo `EdTech.json` abrange todos os cenários transacionais e operacionais consolidados no sistema:

- **Autenticação:** Emissão de tokens JWT e gestão de sessão (comportamento simulado de *HttpOnly* cookies e envio condicional de cabeçalhos CSRF).
- **Domínio de Projetos e Usuários:** Operações CRUD aplicadas a perfis, fluxos de vinculação de laboratório e acompanhamento de pesquisas.
- **Armazenamento e Upload (Supabase/S3):** Chamadas complexas com submissões em *multipart/form-data* e delegação de payload em Storage externo.
- **Governança:** Acesso restrito e paginação das matrizes da Trilha de Auditoria.

---

## Importação e Configuração de Ambiente

Para aferir ou testar a API na sua máquina local:

1. Importe o arquivo `EdTech.json` utilizando o Postman (ou software compatível como Insomnia).
2. Estabeleça um **Environment** (*Ambiente*) e declare a variável base de rotas `{{base_url}}`.
   - Para instâncias locais padrão: `http://localhost:8080`
3. **Autenticação de Rota:** Como a API restringe operações abertas e baseia-se em tokens JWT (*stateless*), ative o fluxo gerando o token pela chamada de Login. No modo de exploração manual, forneça o credencial devolvida pelo endpoint nas requisições subsequentes via menu de *Authorization* (*Bearer Token*).

> A inobservância das regras de negócio ou omissão de campos obrigatórios resultará em respostas estruturadas `400 Bad Request`. Respostas arbitrárias do tipo `500 Internal Server Error` representam anomalias na blindagem de entrada e devem ser reportadas como Issues na rastreabilidade do GitHub.
