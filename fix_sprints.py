import glob
for file in glob.glob('docs/gestao/historico_sprints/semana*.md'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("'---", "'\n---")
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
