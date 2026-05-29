# frontend/ — Interface do DocVault Academic

Interface web do DocVault Academic, construída com React e Tailwind CSS. Oferece experiências distintas e componentes reutilizáveis para cada uma das três personas da plataforma.

---

## Responsabilidade

- Renderizar as interfaces específicas por persona
- Consumir a API REST do módulo `api/`
- Gerenciar estado de autenticação via cookies HttpOnly
- Prover componentes reutilizáveis por contexto de uso

---

## Personas Atendidas

| Persona | Interface |
| :--- | :--- |
| **Pesquisador** | Upload, listagem e gerenciamento dos próprios documentos |
| **Orientador** | Painel de supervisão dos pesquisadores vinculados ao laboratório |
| **Admin do Laboratório** | Gerenciamento de usuários, laboratórios e configurações |

---

## Stack

| Tecnologia | Versão | Função |
| :--- | :---: | :--- |
| **React** | 18.x | Biblioteca para interfaces baseadas em componentes |
| **Tailwind CSS** | 3.x | Utilitários CSS para estilização responsiva |

---

## Como Rodar

> Instruções completas serão adicionadas após o scaffold inicial do React.

```bash
cd docvault/frontend
npm install
npm run dev
```
