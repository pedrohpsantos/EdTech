# 📚 EdTech Docs — Os Manuais e Crônicas

![MkDocs](https://img.shields.io/badge/MkDocs-Material-526CFE?style=for-the-badge&logo=markdown&logoColor=white)
![Docs as Code](https://img.shields.io/badge/Docs-as--Code-ffb142?style=for-the-badge)
![Knowledge Base](https://img.shields.io/badge/Knowledge-Base-purple?style=for-the-badge)

> *"Achegue-se, jovem aprendiz. Sou o Bibliotecário deste ecossistema. Código que funciona hoje, será o legado enigmático de amanhã se não for documentado. Aqui nós preservamos o conhecimento: desde mapas estruturais arquitetônicos (C4 Model) até os registros de decisões imutáveis (ADRs). Nós tratamos a documentação com o mesmo rigor de um código em produção."* 🪶

Bem-vindo ao acervo de sabedoria do EdTech. Utilizamos a filosofia **Docs-as-Code**, o que significa que nossa documentação oficial vive e evolui junto com o código, versionada no Git, revisada em PRs e construída estaticamente através do **MkDocs**.

## 📖 O Catálogo da Biblioteca

Nesta pasta, você encontrará relíquias valiosas:

- **`/docs` (Diretório Raiz do MkDocs):** Os arquivos Markdown que compõem o portal oficial, organizados de forma semântica.
- **`/docs/adrs` (Architecture Decision Records):** O diário histórico das grandes decisões. Por que escolhemos PostgreSQL em vez de Mongo? Por que Java em vez de Go? A resposta mora lá.
- **`/docs/assets`:** Imagens, diagramas gerados pelo PlantUML/Mermaid, logotipos e toda mídia visual que ajuda a contar nossas histórias.
- **`mkdocs.yml` (na raiz do projeto):** O índice mestre que instrui o gerador de sites sobre como construir nossa biblioteca.

---

## 🏗️ Lendo e Escrevendo Novos Capítulos

Qualquer pessoa pode (e deve!) contribuir para o conhecimento. Se você adicionou uma nova rota na API, ou um novo hook no Frontend, escreva sobre isso.

Para escrever e visualizar a documentação como um portal web localmente na sua máquina, utilize o script do Python (`uv` / `pip`):

```bash
# Navegue até a raiz do projeto (fora desta pasta)
cd ..

# Caso não tenha o ambiente Python configurado, instale as dependências:
pip install -r requirements.txt # Ou confie nos scripts de automação se existirem.

# Inicie o servidor do MkDocs
mkdocs serve
```

Acesse `http://localhost:8000` no seu navegador. O servidor será atualizado automaticamente sempre que você salvar um arquivo Markdown (Hot Reloading).

---

## 📜 Os 3 Mandamentos do Cronista

1. **Seja Claro e Atemporal:** Evite gírias ou informações que envelhecem rápido demais ("Na semana passada corrigimos um bug..."). Escreva pensando no desenvolvedor que lerá isso daqui a 3 anos.
2. **Desenhe Diagramas:** Um diagrama Mermaid.js ou PlantUML vale mais que mil palavras de explicação de endpoints.
3. **Use Alertas (Admonitions):** Utilize as caixas de dicas `!!! tip` ou `!!! warning` do MkDocs Material para dar destaque a regras vitais.

> *Lembre-se: O código diz o 'COMO'. A documentação diz o 'POR QUÊ'. Vá e escreva a nossa história.*
