# :material-map-legend: Product Roadmap (Now / Next / Later)

Gantt Charts com datas fictícias geralmente geram quebras de expectativa na indústria ágil. O repasse de "Semanas de Entrega" não traduz o valor que o produto está ganhando.
Na EdTech, adotamos o framework **Now / Next / Later** para guiar a evolução macro do desenvolvimento sem cair na armadilha do microgerenciamento de cronograma.

```mermaid
gantt
    title Product Roadmap Macro (Now / Next / Later)
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%y
    
    section NOW (Atuando)
    Fundação de Segurança (Auth & GCS)     :active, a1, 2026-06-01, 30d
    Pipeline de CI/CD                      :active, a2, 2026-06-15, 20d
    
    section NEXT (Próximos)
    Dashboard de Submissão (Ana)           :a3, 2026-07-01, 30d
    Isolamento e Painel (Carlos)           :a4, 2026-07-15, 40d
    Trilhas de Auditoria (Logs)            :a5, 2026-08-01, 30d
    
    section LATER (Futuro)
    Relatórios em CSV (Márcia)             :a6, 2026-09-01, 30d
    Antiplágio com Machine Learning        :a7, 2026-10-01, 60d
```

## 🟢 NOW (Atuando Agora)
**Foco:** Fundações de segurança, estabilidade do MVP e Integração Continua.
- Setup do cluster PostgreSQL + Integração ao Google Cloud Storage (`ADR 0001`).
- Endpoint unificado de Autenticação com regras restritas para o domínio `@instituicao.edu.br`.
- Configuração do pipeline de CI (Linter de Markdown, Testes unitários rodando no GitHub Actions).

## 🟡 NEXT (Próximos Passos)
**Foco:** Completude do Fluxo de Usuário após a estabilidade da infraestrutura.
- Tela do Dashboard da Ana (Upload, Tracking de Status de `Draft` para `Submitted`).
- Árvore de visualização de subprojetos no Painel do Carlos.
- Geração da base do `audit_logs` nas transações.

## 🔴 LATER (Futuro)
**Foco:** Visão expandida, métricas de negócio e melhorias visuais.
- Relatórios automatizados em CSV para a Márcia (Auditora).
- Modo escuro de interface e Microinterações baseadas no Figma.
- Suporte experimental a Machine Learning para classificar a similaridade dos Artigos Submetidos (Antiplágio interno).

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Substituição de Gantt Acadêmico pelo Now/Next/Later | Pedro Henrique P. Santos |
