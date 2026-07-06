# 📊 Scripts de Telemetria e Análise

![Python](https://img.shields.io/badge/Python-Analytics-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-Data-150458?style=for-the-badge&logo=pandas&logoColor=white)

Este diretório (`/scripts`) armazena ferramentas construídas em **Python** voltadas para telemetria, extração de dados e análises gerenciais da plataforma EdTech. 

O foco destes utilitários é a inteligência de dados: fornecer aos usuários com perfil de Orientador métricas claras sobre a utilização do sistema, acompanhamento de projetos e engajamento nas linhas de pesquisa.

## Escopo das Ferramentas

Os scripts operam sob o gerenciador `uv`, garantindo isolamento de dependências e previsibilidade em qualquer ambiente de execução.

- **Geração de Relatórios Consolidados:** Extração quantitativa de documentos (volumes aprovados, pendentes e rejeitados) segmentados por projeto.
- **Telemetria de Usuários:** Monitoramento de acessos, frequência de submissões e funil de conversão de documentos.
- **Processamento de Dados:** Consolidação de métricas provenientes do Banco de Dados (PostgreSQL) e da API para exportação ou exibição em painéis analíticos.

---

## Execução Padrão

A execução deve ocorrer através do utilitário `uv run` a partir do diretório raiz do projeto, para que dependências isoladas (como `pandas`, `requests` ou `matplotlib`) sejam resolvidas automaticamente sem interferência no ambiente global Python.

```bash
# Execução a partir da raiz do monorepo
uv run scripts/gerar_relatorio_orientador.py
```

---

## Diretrizes de Desenvolvimento de Scripts

A criação de novos scripts de análise deve seguir normas estritas de integridade de dados e segurança da informação:

1. **Acesso Somente-Leitura:** Scripts de telemetria e análise não podem alterar dados produtivos em nenhuma hipótese. As operações devem consumir bases de leitura (*Read Replicas*) no PostgreSQL ou interagir unicamente via requisições `GET` na API autenticada.
2. **Proteção e Anonimização (LGPD):** Informações de identificação pessoal (PII) devem ser anonimizadas ou agregadas. É proibido o vazamento de dados sensíveis em extrações brutas (ex: geração de `.csv` indiscriminada).
3. **Gestão Dinâmica de Dependências:** Declarações de dependência devem estar integradas ao escopo do script (via PEP 723 - *inline script metadata*), permitindo que o `uv` construa o contexto sob demanda de maneira autossuficiente e replicável.
