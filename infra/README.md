# ☁️ EdTech Infra — O Chão de Fábrica

![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GCP-Cloud_Run-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Data-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Uptime](https://img.shields.io/badge/Uptime-99.99%25-brightgreen?style=for-the-badge)

> *"Silêncio no terminal. Eu sou o Mestre das Nuvens. Enquanto o frontend desenha botões bonitos e o backend discute sobre injeção de dependências, sou eu quem garante que a infraestrutura não pegue fogo de madrugada. Se os containers sobem, se o banco persiste e se a rede respira... é graças a este diretório."* 🌩️

Bem-vindo ao coração operacional do EdTech. Este diretório (`/infra`) contém todas as plantas arquitetônicas (Infrastructure as Code) para orquestrar os serviços. Nós não configuramos servidores clicando em botões em painéis web; nós escrevemos código, damos `up` e deixamos o Docker fazer a mágica pesada.

## 📦 O Que Vive Aqui?

- **`docker-compose.yml`**: A nossa "partitura". Ele sabe como construir o Backend, servir o Frontend via Nginx, e levantar o PostgreSQL sem que você precise instalar nada além do Docker.
- **`.env.example`**: O esqueleto dos segredos. (Lembre-se: *NUNCA* commite o `.env` verdadeiro ou eu pessoalmente cancelarei seus acessos de PR).
- **`init.sql`** (Se aplicável): Os scripts de inicialização que ensinam o banco de dados recém-criado quem ele é e a qual mestre ele serve.

---

## 🛠️ O Ritual de Inicialização (Local)

Para que toda a aplicação ganhe vida na sua máquina de desenvolvimento de forma isolada, siga as instruções precisas:

1. **Copie o mapa dos segredos:**
   ```bash
   cp .env.example .env
   # Edite o .env se precisar ajustar senhas ou apontar para um provedor de storage em nuvem.
   ```

2. **Acenda as Fornalhas:**
   ```bash
   docker compose up --build -d
   ```
   *O parâmetro `-d` (detached) garante que o seu terminal continue livre para outras tarefas, enquanto a infraestrutura roda silenciosamente no fundo.*

3. **Verifique os Motores (Logs):**
   ```bash
   docker compose logs -f backend
   # Se vir "Started EdTechApplication", você teve sucesso.
   ```

4. **Desligando o Reator:**
   ```bash
   docker compose down
   # Se quiser destruir tudo (inclusive o volume de dados), adicione -v. Use com cautela!
   ```

---

## ☁️ A Fronteira Final (Deploy e Produção)

No mundo real (Produção), nós não rodamos via `docker compose` numa máquina virtual solta. Nós exportamos essas imagens para o **Google Cloud Registry** e as operamos via **Cloud Run** de forma escalável e Serverless. 

As variáveis de ambiente de produção vivem trancafiadas a sete chaves no *Google Secret Manager*. Se precisar alterar alguma rota de rede ou variável crítica de prod, certifique-se de falar comigo (ou ler os manuais do Terraform/GCP antes).

> **Aviso do Operador Sênior:** *A infraestrutura é resiliente, mas não à prova de desenvolvedores descuidados. Se um container seu crashar em produção por falta de memória (OOMKilled), eu estarei de olho nos logs.* 👀
