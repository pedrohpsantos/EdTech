# Postman — EdTech

> Uma coleção de exploração manual alinhada ao contrato HTTP real da plataforma.

## Visão geral

`EdTech_Collection.json` acompanha as rotas efetivas do backend e deve ser atualizada sempre que um contrato HTTP mudar.

## Comece aqui

1. Importe `EdTech_Collection.json` no Postman.
2. Defina `baseUrl` como `http://localhost:8080` para desenvolvimento ou como a URL autorizada do ambiente publicado.
3. Faça login em `POST {{baseUrl}}/api/auth/login`.

O backend estabelece a sessão no cookie `jwt` (`HttpOnly`). Portanto, não copie um JWT para variável ou cabeçalho manualmente: use o cookie jar do Postman e habilite o envio de cookies para o domínio da API.

## Cobertura

- autenticação, cadastro/verificação e recuperação de senha;
- projetos e documentos;
- comentários, revisão e exportações de auditoria;
- vínculo de laboratório em `/api/v1/laboratory`.

Use apenas contas de desenvolvimento/demonstração. A coleção não substitui testes automatizados e não deve ser executada como carga contra produção.

## Validação

Após modificar a coleção, confirme as rotas com os controllers e com `frontend/src/services/api.ts`. O cookie `jwt` é administrado pelo cookie jar do Postman; não o copie para cabeçalhos manuais.

## Referências

- [Backend](../backend/README.md)
- [Testes](../tests/README.md)
- [Pipelines](../.github/PIPELINES.md)
