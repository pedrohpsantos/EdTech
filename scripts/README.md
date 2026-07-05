# 📊 Scripts de Telemetria e Análise

![Python](https://img.shields.io/badge/Python-Analytics-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-Data-150458?style=for-the-badge&logo=pandas&logoColor=white)

Neste diretório (`/scripts`), armazenamos nossas ferramentas em **Python** dedicadas à telemetria, extração de dados e análises avançadas voltadas para o perfil do **Orientador** e para a administração do laboratório. 

Ao invés de scripts genéricos de automação, focamos aqui em inteligência de dados: gerando insights sobre a utilização da plataforma, engajamento dos pesquisadores e métricas de andamento dos projetos.

## 🧰 O Que Temos na Caixa de Ferramentas?

Nossos scripts são construídos em Python e utilizam o moderno gerenciador `uv` para garantir gestão de dependências rápida e perfeitamente isolada.

- **Geração de Relatórios Consolidados:** Extração de métricas quantitativas (quantos documentos aprovados/rejeitados, volumetria por projeto).
- **Telemetria de Usuários:** Análise de engajamento dos pesquisadores, frequência de uploads e funil de acessos.
- **Processamento de Dados:** Scripts que consomem o Banco de Dados (ou a API) para alimentar dashboards externos ou planilhas de acompanhamento gerencial do Orientador.

---

## ⚡ Como Executar as Análises

Recomendamos fortemente usar o `uv run` para executar os scripts sem "sujar" seu ambiente global do Python. Execute os comandos a partir do diretório raiz do projeto:

```bash
# Exemplo de execução de um script de telemetria
uv run scripts/gerar_relatorio_orientador.py
```

O `uv` se encarregará de ler os metadados do script e instalar automaticamente pacotes necessários (como `pandas`, `requests` ou `matplotlib`) em um ambiente efêmero, sem dor de cabeça.

---

## 📜 Código de Honra dos Dados

Se você for contribuir criando um novo script de análise para o Orientador, siga nosso código de honra:

1. **Apenas Leitura (Read-Only):** Scripts de telemetria e análise **NUNCA** devem alterar os dados em produção. Utilize conexões read-only no PostgreSQL ou consuma unicamente as rotas seguras `GET` da nossa API.
2. **Proteção de Dados (LGPD):** Ao gerar relatórios, anonimize informações onde cabível e nunca vaze dados sensíveis em exports `.csv` sem contexto adequado.
3. **Seja Autossuficiente:** Declare dependências no próprio script (formato PEP 723 / inline script metadata) para que o `uv` consiga resolver os pacotes sob demanda.

> *"A intuição guia, mas são os dados que confirmam. Transforme telemetria em ação."*
