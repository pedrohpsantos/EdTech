# API Reference (Contratos da Sprint 5)

Esta documentação serve como contrato para a comunicação entre o Frontend e o Backend. As rotas abaixo compõem os escopos de **Projetos** e **Documentos**.

Todas as rotas necessitam do Cookie `jwt_token` contendo um token válido.

---

## Autenticação (Auth)

### Registro de Usuário
**`POST /api/auth/register`**

Cria um novo usuário na plataforma.

**Request Body:**
```json
{
  "name": "Maria Silva",
  "email": "maria@unb.br",
  "password": "senhaSegura123",
  "role": "ADVISOR"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-do-usuario",
  "name": "Maria Silva",
  "email": "maria@unb.br",
  "role": "ADVISOR"
}
```

---

### Login
**`POST /api/auth/login`**

Autentica um usuário e retorna o token JWT via cookie (além do token CSRF e dados do usuário).

**Request Body:**
```json
{
  "email": "maria@unb.br",
  "password": "senhaSegura123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": "uuid-do-usuario",
    "name": "Maria Silva",
    "email": "maria@unb.br",
    "role": "ADVISOR"
  }
}
```

---

### Perfil do Usuário
**`GET /api/auth/me`**

Retorna os dados do usuário autenticado atual.

**Response (200 OK):**
```json
{
  "id": "uuid-do-usuario",
  "name": "Maria Silva",
  "email": "maria@unb.br",
  "role": "ADVISOR"
}
```

---

### Logout
**`POST /api/auth/logout`**

Invalida a sessão atual e limpa os cookies.

**Response (200 OK)**

---

## Projetos

### 1. Criar Projeto
**`POST /api/projects`**

Cria um novo projeto. O usuário autenticado se torna automaticamente o `ADVISOR` deste projeto.

**Request Body:**
```json
{
  "title": "Análise de Algoritmos Distribuídos",
  "description": "Projeto focado em redes P2P."
}
```

**Response (201 Created):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Análise de Algoritmos Distribuídos",
  "description": "Projeto focado em redes P2P.",
  "advisorId": "uuid-do-orientador",
  "createdAt": "2026-06-12T14:30:00Z"
}
```

---

### 2. Listar Projetos do Usuário
**`GET /api/projects`**

Retorna a lista de todos os projetos em que o usuário logado está vinculado (seja como orientador ou pesquisador).

**Response (200 OK):**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Análise de Algoritmos Distribuídos",
    "description": "Projeto focado em redes P2P.",
    "advisorId": "uuid-do-orientador",
    "createdAt": "2026-06-12T14:30:00Z"
  }
]
```

---

### 3. Adicionar Membro a um Projeto
**`POST /api/projects/{projectId}/members`**

Vincula um pesquisador ao projeto (apenas quem é ADVISOR do projeto pode usar).

**Request Body:**
```json
{
  "email": "pesquisador@unb.br",
  "role": "RESEARCHER"
}
```

**Response (201 Created):**
```json
{
  "message": "Member added successfully"
}
```

---

## Documentos

### 4. Upload de Documento
**`POST /api/documents`**

Envia um novo arquivo vinculado a um projeto.

**Headers:**
`Content-Type: multipart/form-data`

**Request Form Data:**
- `file` (File): O arquivo físico (ex: PDF).

- `title` (String): O título do documento.

- `projectId` (String/UUID): ID do projeto associado.

**Response (201 Created):**
```json
{
  "id": "abcd5678-e89b-12d3-a456-426614174000",
  "title": "Relatório Final.pdf",
  "fileUrl": "https://xyz.supabase.co/storage/v1/object/public/documents/uuid-do-arquivo.pdf",
  "status": "DRAFT",
  "projectId": "123e4567-e89b-12d3-a456-426614174000",
  "authorId": "uuid-do-autor",
  "createdAt": "2026-06-12T15:00:00Z"
}
```

---

### 5. Listar Documentos
**`GET /api/documents`**

Retorna os documentos vinculados aos projetos que o usuário acessa.

**Response (200 OK):**
```json
[
  {
    "id": "abcd5678-e89b-12d3-a456-426614174000",
    "title": "Relatório Final.pdf",
    "fileUrl": "https://xyz.supabase.co/storage/v1/object/public/documents/uuid-do-arquivo.pdf",
    "status": "DRAFT",
    "projectId": "123e4567-e89b-12d3-a456-426614174000",
    "authorId": "uuid-do-autor",
    "createdAt": "2026-06-12T15:00:00Z"
  }
]
```

---

### 6. Detalhar Documento
**`GET /api/documents/{id}`**

Retorna as informações completas de um documento específico.

---

### 7. Excluir Documento
**`DELETE /api/documents/{id}`**

Remove um documento. **Regra de negócio:** Apenas documentos no status `DRAFT` podem ser excluídos.

**Response (204 No Content)**

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 13/06/2026 | Criação do documento de suporte ao DevEx | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `1.2` | 21/06/2026 | Adição dos endpoints de Auth e correção das URLs do S3 | Pedro Henrique P. Santos |
