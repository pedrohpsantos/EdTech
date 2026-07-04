---
title: 'Guia de Setup Local (Onboarding)'
---

# :material-rocket-launch: Guia Rápido de Onboarding

Bem-vindo ao repositório do **EdTech**! Sabemos que configurar um projeto novo pode ser chato, por isso criamos um **Setup 1-Click** baseado em Docker para você ter todo o ambiente rodando na sua máquina em menos de 5 minutos.

---

## :material-checkbox-marked-circle-outline: Lista de Verificação

Para começar a contribuir, marque os passos conforme avança:

- [ ] Instalar o [Docker Desktop](https://www.docker.com/products/docker-desktop) (ou Docker Engine + Docker Compose V2)
- [ ] Criar o arquivo de variáveis de ambiente (`infra/.env`)
- [ ] Iniciar os containers via `docker-compose`
- [ ] Acessar o frontend no navegador

---

## :material-console: Subindo o Ambiente (1-Click Setup)

Nossa arquitetura roda PostgreSQL, Spring Boot (Backend) e Vite/React (Frontend). Tudo foi orquestrado em um único `docker-compose.yml` na pasta `infra/`.

### 1. Configurando Variáveis

Primeiro, você precisa criar as chaves de ambiente copiando o arquivo de exemplo.

=== "Windows (PowerShell)"

    ```powershell
    # Na raiz do repositório
    Copy-Item infra/.env.example infra/.env
    ```

=== "Linux / macOS"

    ```bash
    # Na raiz do repositório
    cp infra/.env.example infra/.env
    ```

> [!IMPORTANT]
> **Edite o arquivo `infra/.env`!** Você deve preencher os valores das chaves `POSTGRES_PASSWORD` e `JWT_SECRET` com qualquer senha forte local antes de prosseguir.

### 2. Rodando o Projeto

Com o Docker em execução, inicie toda a stack com um único comando:

```bash
docker compose --env-file infra/.env -f infra/docker-compose.yml up -d
```

> [!TIP]
> A flag `-d` roda os containers em *detached mode* (segundo plano). Se for sua primeira vez, o Docker irá baixar (pull) as imagens do Java e do Node e construir o projeto. Isso pode demorar entre 2 a 5 minutos.

---

## :material-check-decagram: Verificando a Instalação

Após a conclusão do build, você pode checar se todos os serviços estão saudáveis:

```bash
docker compose -f infra/docker-compose.yml ps
```

Se tudo estiver correto, você poderá acessar:

- **Frontend (Painel Web):** [http://localhost:5173](http://localhost:5173)
- **Backend (API Health):** [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health)
- **Banco de Dados:** Conecte-se em `localhost:5432` com usuário `edtech_user`.

---

## :material-lifebuoy: Troubleshooting (Problemas Comuns)

> [!WARNING]
> **Erro de portas em uso (Bind for 0.0.0.0:5432 failed)**  
> Se o PostgreSQL não subir, você provavelmente já tem outro banco rodando na porta 5432 localmente. Altere a porta no arquivo `infra/.env` editando a variável `POSTGRES_PORT`.

> [!NOTE]
> **Como eu paro os containers?**  
> Para desligar a infraestrutura sem apagar os dados do banco de dados, rode:  
> `docker compose -f infra/docker-compose.yml stop`  
> Para desligar e **apagar** todos os dados, rode:  
> `docker compose -f infra/docker-compose.yml down -v`
