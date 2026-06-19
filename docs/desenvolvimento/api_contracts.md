# :material-handshake: Contratos de API

Especificação técnica dos contratos de Request/Response da API REST do EdTech. Este documento serve como **fonte única de verdade** para que as frentes de Backend e Frontend trabalhem em paralelo sem divergências de integração.

---

## Convenções Gerais

| Item | Valor |
| :--- | :--- |
| **Base URL** | `http://localhost:8080` (dev) |
| **Autenticação** | Cookie `token` (JWT `HttpOnly`, `Secure`, `SameSite=Lax`) |
| **CSRF** | Cookie `XSRF-TOKEN` → Header `X-XSRF-TOKEN` (obrigatório em `POST`, `PATCH`, `DELETE`) |
| **Content-Type padrão** | `application/json` (exceto upload de arquivo) |
| **IDs** | `UUID v4` (formato: `"550e8400-e29b-41d4-a716-446655440000"`) |
| **Timestamps** | ISO 8601 (`"2026-06-19T13:30:00Z"`) |

!!! info "Padrão de Erro"
    Todas as respostas de erro seguem o formato unificado:
    ```json
    {
      "code": "error_code_snake_case",
      "message": "Descrição legível para o usuário."
    }
    ```

---

## :material-shield-lock: Módulo de Autenticação

### `POST /api/auth/register`

Cria uma nova conta de pesquisador.

=== "Request"

    **Headers:** `Content-Type: application/json`

    ```json
    {
      "name": "Ana Silva",
      "email": "ana.silva@unb.br",
      "password": "SenhaSegura123"
    }
    ```

    | Campo | Tipo | Obrigatório | Validação |
    | :--- | :--- | :---: | :--- |
    | `name` | `string` | ✅ | max 120 caracteres |
    | `email` | `string` | ✅ | Válido, max 180 chars, domínio `@unb.br` |
    | `password` | `string` | ✅ | min 8, max 120 caracteres |

=== "Response `201 Created`"

    ```json
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Ana Silva",
      "email": "ana.silva@unb.br",
      "role": "RESEARCHER",
      "active": true,
      "createdAt": "2026-06-19T13:30:00Z"
    }
    ```

=== "Erros"

    | Status | Código | Quando |
    | :---: | :--- | :--- |
    | `400` | `invalid_request` | Campos faltando ou inválidos |
    | `400` | `invalid_institutional_email` | Email fora do domínio `@unb.br` |
    | `409` | `email_already_registered` | Email já cadastrado |

---

### `POST /api/auth/login`

Autentica o usuário e define o cookie JWT.

=== "Request"

    **Headers:** `Content-Type: application/json`

    ```json
    {
      "email": "ana.silva@unb.br",
      "password": "SenhaSegura123"
    }
    ```

=== "Response `200 OK`"

    **Set-Cookie:** `token=<JWT>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`

    ```json
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Ana Silva",
      "email": "ana.silva@unb.br",
      "role": "RESEARCHER",
      "active": true,
      "createdAt": "2026-06-19T13:30:00Z"
    }
    ```

=== "Erros"

    | Status | Código | Quando |
    | :---: | :--- | :--- |
    | `400` | `invalid_request` | Campos faltando |
    | `401` | `invalid_credentials` | Email/senha incorretos ou conta inativa |

---

### `POST /api/auth/logout`

Limpa o cookie de autenticação.

=== "Request"

    **Headers:** `X-XSRF-TOKEN: <valor do cookie XSRF-TOKEN>`

=== "Response `200 OK`"

    **Set-Cookie:** `token=; Max-Age=0` (cookie removido)

    Corpo vazio.

---

### `GET /api/auth/me`

Retorna os dados do usuário autenticado.

=== "Response `200 OK`"

    ```json
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Ana Silva",
      "email": "ana.silva@unb.br",
      "role": "RESEARCHER",
      "active": true,
      "createdAt": "2026-06-19T13:30:00Z"
    }
    ```

=== "Erros"

    | Status | Código | Quando |
    | :---: | :--- | :--- |
    | `401` | — | Cookie `token` ausente ou expirado |

---

## :material-folder-multiple: Módulo de Projetos

### `POST /api/projects`

Cria um novo projeto de pesquisa (o criador é automaticamente adicionado como `ADVISOR`).

=== "Request"

    ```json
    {
      "title": "Análise de Dados Ambientais",
      "description": "Projeto de pesquisa sobre qualidade do ar em Brasília"
    }
    ```

=== "Response `201 Created`"

    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Análise de Dados Ambientais",
      "description": "Projeto de pesquisa sobre qualidade do ar em Brasília",
      "advisorId": "550e8400-e29b-41d4-a716-446655440000",
      "createdAt": "2026-06-19T14:00:00Z"
    }
    ```

---

### `GET /api/projects`

Lista projetos do usuário autenticado (todos dos quais é membro).

=== "Response `200 OK`"

    ```json
    [
      {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "title": "Análise de Dados Ambientais",
        "description": "Projeto de pesquisa sobre qualidade do ar em Brasília",
        "advisorId": "550e8400-e29b-41d4-a716-446655440000",
        "createdAt": "2026-06-19T14:00:00Z"
      }
    ]
    ```

---

### `POST /api/projects/{projectId}/members`

Adiciona um membro ao projeto. **Apenas `ADVISOR` do projeto pode executar.**

=== "Request"

    ```json
    {
      "email": "carlos.souza@unb.br",
      "role": "RESEARCHER"
    }
    ```

    | Campo | Tipo | Valores aceitos |
    | :--- | :--- | :--- |
    | `email` | `string` | Email cadastrado no sistema |
    | `role` | `string` | `"ADVISOR"` ou `"RESEARCHER"` |

=== "Response `201 Created`"

    Corpo vazio.

=== "Erros"

    | Status | Código | Quando |
    | :---: | :--- | :--- |
    | `403` | — | Usuário não é ADVISOR do projeto |
    | `404` | — | Projeto ou email não encontrado |

---

## :material-file-document: Módulo de Documentos

### `POST /api/documents`

Upload de um documento vinculado a um projeto.

!!! warning "Content-Type"
    Este endpoint usa **`multipart/form-data`**, não JSON. O frontend deve enviar via `FormData`.

=== "Request"

    **Headers:**

    - `Content-Type: multipart/form-data`
    - `X-XSRF-TOKEN: <valor do cookie>`

    **Form Fields:**

    | Campo | Tipo | Obrigatório | Descrição |
    | :--- | :--- | :---: | :--- |
    | `file` | `binary` | ✅ | Arquivo (PDF, CSV, JSON) |
    | `title` | `string` | ✅ | Título do documento |
    | `projectId` | `UUID` | ✅ | ID do projeto vinculado |

    ```javascript
    // Exemplo no Frontend (api.js)
    const formData = new FormData();
    formData.append('file', arquivoSelecionado);
    formData.append('title', 'Relatório Final');
    formData.append('projectId', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    ```

=== "Response `201 Created`"

    ```json
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "title": "Relatório Final",
      "fileUrl": "/uploads/uuid_nome-arquivo.pdf",
      "status": "DRAFT",
      "authorId": "550e8400-e29b-41d4-a716-446655440000",
      "projectId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "createdAt": "2026-06-19T15:00:00-03:00"
    }
    ```

=== "Erros"

    | Status | Código | Quando |
    | :---: | :--- | :--- |
    | `400` | — | Campos faltando ou arquivo com nome inválido |
    | `403` | — | Usuário não é membro do projeto |
    | `404` | — | Projeto não encontrado |

---

### `GET /api/documents`

Lista documentos acessíveis ao usuário autenticado, com filtros opcionais.

=== "Query Parameters"

    | Parâmetro | Tipo | Obrigatório | Descrição |
    | :--- | :--- | :---: | :--- |
    | `projectId` | `UUID` | ❌ | Filtrar por projeto |
    | `title` | `string` | ❌ | Busca parcial por título (case-insensitive) |

    ```
    GET /api/documents?projectId=a1b2c3d4-...&title=relatorio
    ```

=== "Response `200 OK`"

    ```json
    [
      {
        "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "title": "Relatório Final",
        "fileUrl": "/uploads/uuid_relatorio.pdf",
        "status": "DRAFT",
        "authorId": "550e8400-e29b-41d4-a716-446655440000",
        "projectId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "createdAt": "2026-06-19T15:00:00-03:00"
      }
    ]
    ```

---

### `DELETE /api/documents/{id}`

Exclui um documento. **Apenas o autor pode excluir** e o documento deve estar com status `DRAFT`.

=== "Response `204 No Content`"

    Corpo vazio.

=== "Erros"

    | Status | Código | Quando |
    | :---: | :--- | :--- |
    | `403` | — | Usuário não é o autor do documento |
    | `404` | — | Documento não encontrado |
    | `409` | — | Status não é `DRAFT` |

---

### `PATCH /api/documents/{id}/status` *(Sprint 5)*

Altera o status de um documento (aprovação/rejeição). **Apenas `ADVISOR` do projeto vinculado pode executar.**

=== "Request"

    ```json
    {
      "status": "APPROVED",
      "feedback": "Excelente trabalho. Aprovado para publicação."
    }
    ```

    | Campo | Tipo | Obrigatório | Valores aceitos |
    | :--- | :--- | :---: | :--- |
    | `status` | `string` | ✅ | `"APPROVED"` ou `"REJECTED"` |
    | `feedback` | `string` | ❌ | Comentário livre do orientador |

=== "Response `200 OK`"

    ```json
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "title": "Relatório Final",
      "fileUrl": "/uploads/uuid_relatorio.pdf",
      "status": "APPROVED",
      "authorId": "550e8400-e29b-41d4-a716-446655440000",
      "projectId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "createdAt": "2026-06-19T15:00:00-03:00"
    }
    ```

=== "Erros"

    | Status | Código | Quando |
    | :---: | :--- | :--- |
    | `400` | — | Status inválido |
    | `403` | — | Usuário não é ADVISOR do projeto |
    | `404` | — | Documento não encontrado |

---

## :material-clipboard-text-clock: Módulo de Auditoria *(Sprint 5)*

### `GET /api/audit-logs`

Lista logs de auditoria com paginação e filtros. **Apenas `AUDITOR` pode acessar.**

=== "Query Parameters"

    | Parâmetro | Tipo | Obrigatório | Descrição |
    | :--- | :--- | :---: | :--- |
    | `page` | `int` | ❌ | Página (padrão: `0`) |
    | `size` | `int` | ❌ | Itens por página (padrão: `20`, max: `100`) |
    | `action` | `string` | ❌ | Filtrar por tipo (`LOGIN_SUCCESS`, `UPLOAD_SUCCESS`, etc.) |
    | `userId` | `UUID` | ❌ | Filtrar por usuário |
    | `startDate` | `ISO date` | ❌ | Data inicial (`2026-06-01`) |
    | `endDate` | `ISO date` | ❌ | Data final (`2026-06-30`) |

    ```
    GET /api/audit-logs?page=0&size=20&action=UPLOAD_SUCCESS&startDate=2026-06-01
    ```

=== "Response `200 OK`"

    O Spring Data devolve o objeto `Page`, que contém os itens e metadados de paginação:

    ```json
    {
      "content": [
        {
          "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
          "userId": "550e8400-e29b-41d4-a716-446655440000",
          "userName": "Ana Silva",
          "action": "UPLOAD_SUCCESS",
          "resourceType": null,
          "resourceId": null,
          "ipAddress": null,
          "details": "Documento anexado: Relatório Final",
          "createdAt": "2026-06-19T15:00:00"
        }
      ],
      "totalElements": 42,
      "totalPages": 3,
      "number": 0,
      "size": 20,
      "first": true,
      "last": false
    }
    ```

=== "Erros"

    | Status | Código | Quando |
    | :---: | :--- | :--- |
    | `401` | — | Não autenticado |
    | `403` | — | Usuário não possui role `AUDITOR` |

---

## :material-tag-multiple: Referência de Enums

### `UserRole`

| Valor | Descrição |
| :--- | :--- |
| `RESEARCHER` | Pesquisador — perfil padrão |
| `ADVISOR` | Orientador — supervisiona projetos |
| `AUDITOR` | Auditor — acessa logs de compliance |

### `DocumentStatus`

| Valor | Descrição |
| :--- | :--- |
| `DRAFT` | Rascunho — recém-enviado |
| `PENDING_REVIEW` | Em revisão pelo orientador |
| `APPROVED` | Aprovado pelo orientador |
| `REJECTED` | Rejeitado pelo orientador |
| `PUBLISHED` | Publicado (futuro) |
| `ARCHIVED` | Arquivado (futuro) |

### `AcaoAuditoria`

| Valor | Descrição |
| :--- | :--- |
| `LOGIN_SUCCESS` | Login bem-sucedido |
| `LOGIN_FAILED` | Tentativa de login com senha errada |
| `LOGOUT` | Sessão encerrada |
| `REGISTER` | Conta criada |
| `UPLOAD_SUCCESS` | Upload de documento concluído |
| `UPLOAD_FAILED` | Falha no upload |
| `DOWNLOAD` | Download de documento |
| `DELETE_DOCUMENT` | Documento excluído |
| `DOCUMENT_APPROVED` | Documento aprovado pelo orientador |
| `DOCUMENT_REJECTED` | Documento rejeitado pelo orientador |

### `ProjectRole`

| Valor | Descrição |
| :--- | :--- |
| `ADVISOR` | Orientador do projeto |
| `RESEARCHER` | Pesquisador do projeto |

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 19/06/2026 | Criação do documento de contratos de API para a Sprint 5 | Pedro Henrique P. Santos |
