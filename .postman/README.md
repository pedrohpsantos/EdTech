# 📬 EdTech Postman — O Carteiro Explorador

![Postman](https://img.shields.io/badge/Postman-API_Testing-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![REST API](https://img.shields.io/badge/API-RESTful-005571?style=for-the-badge)

> *"Bom dia! Tem encomenda para o Backend! ✉️ Eu sou o Carteiro Explorador. Meu trabalho é garantir que as requisições cheguem inteiras, com os cabeçalhos certos, tokens autênticos e pacotes JSON formatados perfeitamente. Se a API disser '200 OK', meu dia está ganho. Se disser '401 Unauthorized', é hora de trocar a fechadura (ou o JWT)!"* 📦

Bem-vindo à sala de correspondências! Este diretório oculto contém a coleção exportada oficial do **Postman** (ou Insomnia, dependendo de qual cliente você prefere) para você interagir e testar nossa API local ou em produção.

## 📨 O Pacote de Coleções

O arquivo `EdTech.json` contido aqui é a sua chave-mestra para explorar os endpoints. Ele possui toda a estrutura da nossa API já mastigada:

- **Autenticação:** Rotas para gerar o Token JWT.
- **Pesquisadores:** Rotas de CRUD para perfis.
- **Relatórios:** Upload, download e listagem de dados.
- **Auditoria:** Endpoints para verificar os logs gerados (apenas admin).

---

## 🏃 Como Importar e Rodar

Não tente adivinhar as rotas lendo os Controllers do Backend. Poupe seu tempo:

1. Abra o seu Postman (ou qualquer outro cliente API compatível, como o Insomnia).
2. Vá em **Import** (Importar) e selecione o arquivo `EdTech.json` desta pasta.
3. **Atenção aos Ambientes (Environments):** Configure uma variável global chamada `{{base_url}}`.
   - Para desenvolvimento local: Defina o valor como `http://localhost:8080`
4. **O Segredo do Carteiro (JWT):** Nossa API é protegida (graças ao Guardião lá no Backend). Após chamar a rota de Login e receber o token, coloque-o na aba de *Authorization -> Bearer Token* para que as próximas rotas confiem em você.

> *Dica: Se você conseguir burlar alguma regra e retornar um HTTP 500 em vez de uma mensagem de erro tratada, por favor, abra uma issue. Nós não gostamos de encomendas extraviadas.*
