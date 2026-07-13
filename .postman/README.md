# Coleção Postman da API EdTech

`EdTech_Collection.json` é a coleção manual da API. Ela acompanha as rotas efetivas do backend e deve ser atualizada sempre que um contrato HTTP mudar.

## Importar e configurar

1. Importe `EdTech_Collection.json` no Postman.
2. Defina `baseUrl` como `http://localhost:8080` para desenvolvimento ou como a URL autorizada do ambiente publicado.
3. Faça login em `POST {{baseUrl}}/api/auth/login`.

O backend estabelece a sessão no cookie `jwt` (`HttpOnly`). Portanto, não copie um JWT para variável ou cabeçalho manualmente: use o cookie jar do Postman e habilite o envio de cookies para o domínio da API.

## Cobertura atual

- autenticação, cadastro/verificação e recuperação de senha;
- projetos e documentos;
- comentários, revisão e exportações de auditoria;
- vínculo de laboratório em `/api/v1/laboratory`.

Use apenas contas de desenvolvimento/demonstração. A coleção não substitui testes automatizados e não deve ser executada como carga contra produção.
