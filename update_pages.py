import os
import re

updates = {
    'docs/.pages': "title: ':material-home: Início'",
    'docs/arquitetura/.pages': "title: ':material-puzzle: Arquitetura de Software'",
    'docs/arquitetura/adrs/.pages': "title: ':material-text-box-check: Decisões Técnicas (ADRs)'",
    'docs/arquitetura/diagramas/.pages': "title: ':material-schema: Diagramas de Sistema'",
    'docs/arquitetura/infraestrutura/.pages': "title: ':material-server: Infraestrutura e Segurança'",
    'docs/desenvolvimento/.pages': "title: ':material-code-tags: Desenvolvimento'",
    'docs/gestao/.pages': "title: ':material-account-group: Gestão e Metodologia Ágil'",
    'docs/gestao/agile/.pages': "title: ':material-handshake: Ritos e Acordos'",
    'docs/gestao/equipe/.pages': "title: ':material-account-multiple: Time e Atribuições'",
    'docs/gestao/historico_sprints/.pages': "title: ':material-history: Histórico de Sprints'",
    'docs/gestao/planejamento/.pages': "title: ':material-calendar-month: Planejamento Macro'",
    'docs/gestao/reunioes/.pages': "title: ':material-notebook: Atas de Reuniões'",
    'docs/produto/.pages': "title: ':material-bullseye-arrow: Produto e Negócio'",
    'docs/produto/branding/.pages': "title: ':material-palette: Identidade Visual e Design'",
    'docs/produto/discovery/.pages': "title: ':material-magnify: Descoberta'",
    'docs/produto/requisitos/.pages': "title: ':material-format-list-checks: Requisitos e Backlog'",
    'docs/produto/strategy/.pages': "title: ':material-chess-knight: Estratégia de Produto'"
}

for filepath, new_title in updates.items():
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'title:' in content:
            content = re.sub(r'title:.*', new_title, content)
        else:
            content = new_title + '\n' + content
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
