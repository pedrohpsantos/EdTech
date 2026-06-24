# Guia de Setup Local (Onboarding)

Bem-vindo ao projeto EdTech! Siga este guia para configurar sua máquina e rodar o projeto localmente em poucos minutos.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados na sua máquina:

- **Node.js** (v20 ou superior)
- **Java JDK** (v21 ou superior)
- **Docker** e **Docker Compose**
- **Git**

## 1. Subindo o Banco de Dados

O projeto utiliza PostgreSQL. Em ambiente de desenvolvimento, subimos o banco via Docker Compose.

```bash
# Na raiz do repositório
cp infra/.env.example infra/.env
# Preencha POSTGRES_PASSWORD e JWT_SECRET em infra/.env
docker compose --env-file infra/.env -f infra/docker-compose.yml up -d
```
*Isso iniciará o container `edtech-postgres` rodando na porta `5432`.*

## 2. Rodando o Backend (Spring Boot)

O backend utiliza o wrapper do Maven (`mvnw`), então você não precisa ter o Maven instalado globalmente.

```bash
# Entre na pasta da API
cd docvault/api

# Rode o backend
./mvnw spring-boot:run
```
*O Spring Boot subirá na porta `8080`. As migrations do Flyway criarão as tabelas automaticamente.*

## 3. Rodando o Frontend (Vite + React)

O frontend utiliza Vite para inicialização e Hot Module Replacement super rápidos.

```bash
# Em uma nova aba do terminal, entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
*O Vite subirá o frontend na porta `5173`. Acesse `http://localhost:5173` no seu navegador.*

---

**Troubleshooting:**
Se você encontrar erros de CORS durante o desenvolvimento local, certifique-se de que o backend está rodando e de que você acessou o frontend em `localhost:5173` (e não via IP como `127.0.0.1`). O proxy do Vite embutido lida com a ponte transparente para a API local.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 13/06/2026 | Criação do documento de suporte ao DevEx | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
