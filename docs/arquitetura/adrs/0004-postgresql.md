# ADR 0004: Escolha do Banco de Dados Relacional (PostgreSQL)

## Status

Aceito

## Contexto

O EdTech precisa manter relações estritas entre as entidades: Orientadores coordenam Projetos, que têm Pesquisadores (Membros), que por sua vez submetem Documentos. O acesso aos documentos é inteiramente guiado por essa árvore de hierarquia, garantindo o "Isolamento Visual" solicitado nos requisitos.
Além disso, o sistema conta com um módulo de Auditoria que exige um histórico imutável (`append-only`) de eventos complexos. Precisamos de consistência forte (ACID) para impedir que documentos fiquem orfãos ou que logs de auditoria se percam. Bancos NoSQL poderiam oferecer maior velocidade de inserção, mas à custa da integridade referencial que o projeto demanda.

## Decisão

Optamos por usar **PostgreSQL**, hospedado no **Google Cloud SQL**.

## Consequências

### Positivas

- **Integridade Relacional (ACID):** Permite usar *Foreign Keys* para assegurar, no nível do banco de dados, que nenhum documento exista sem um autor válido e que pesquisadores só pertençam a projetos existentes.

- **Consultas Complexas:** O módulo de auditoria demandará pesquisas como "todos os logs de acesso negado a documentos do projeto X no mês Y". O SQL lida com isso de maneira madura.

- **Ecossistema:** Ferramentas como o Flyway (para versionamento de esquema) e o Spring Data JPA funcionam de forma nativa e extremamente consolidada com PostgreSQL.

### Negativas / Riscos

- **Gerenciamento de Esquema:** Alterações na estrutura de dados (DDL) exigem migrações explícitas, diminuindo ligeiramente a agilidade em relação a um banco de dados orientado a documentos.

- **Custo Fixo:** Diferente do Cloud Run (Serverless computacional), o Cloud SQL possui um custo base contínuo por instância, mesmo ocioso. Para atenuar, será escolhida a menor instância possível para o ambiente de desenvolvimento/homologação.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento | Pedro Henrique P. Santos |
| 1.1 | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
