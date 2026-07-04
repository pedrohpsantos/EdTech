# 🤖 EdTech Scripts — O Arsenal do Ninja

![Bash](https://img.shields.io/badge/Bash-Scripts-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white)
![Python](https://img.shields.io/badge/Python-Automation-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Time Saved](https://img.shields.io/badge/Tempo_Salvo-Infinito-blueviolet?style=for-the-badge)

> *"Você demorou 15 minutos fazendo isso manualmente? Amador. Eu poderia ter escrito um script em 5 horas para fazer a mesma coisa em 2 segundos! Brincadeiras à parte, sou o Ninja da Automação. Se algo exige que você digite os mesmos três comandos mais de uma vez, essa tarefa pertence a mim. Bem-vindo ao diretório onde cortamos caminhos (com segurança) e fazemos as máquinas suarem no nosso lugar."* 🥷

Neste diretório (`/scripts`), nós guardamos nosso arsenal de automação. Estes são atalhos táticos desenvolvidos para resolver problemas chatos, acelerar builds, migrar dados rapidamente e executar testes operacionais em um estalar de dedos.

## 🧰 O Que Temos na Caixa de Ferramentas?

Nossos scripts variam desde pequenos atalhos de linha de comando (`.sh`, `.ps1`) até rotinas mais robustas escritas em **Python** (usando o gerenciador `uv` para dependências isoladas).

- Ferramentas de mocking (carga de dados falsos para testes locais).
- Scripts de validação de ambiente (verificar se as variáveis do `.env` estão corretas antes de subir os containers).
- Limpeza de artefatos pesados (kill em containers zumbis, limpeza de volumes do Docker).

---

## ⚡ Como Invocar a Magia

Os scripts devem ser executados a partir do diretório raiz do projeto (geralmente), a menos que as instruções internas digam o contrário.

Se for um script **Bash** (Linux / macOS / WSL):
```bash
# Lembre-se de dar permissão de execução (chmod +x) antes da primeira vez.
./scripts/limpar-ambiente.sh
```

Se for um script **Python** (usando nosso amado gerenciador `uv`):
```bash
# Isso garantirá que ele roda isolado sem quebrar seu Python global.
uv run scripts/seed_database.py
```

---

## 📜 Código de Honra do Hacker Pragmático

Se você quiser contribuir criando um novo script, siga o código de honra:

1. **Não destrua sem perguntar:** Scripts destrutivos (como dropar um banco inteiro) DEVEM ter um prompt perguntando `Tem certeza? [s/N]`. Não me responsabilizo pelos seus dedos nervosos.
2. **Seja independente:** Tente depender do mínimo possível de libs globais. Se precisar de bibliotecas, crie um arquivo `requirements.txt` local ou injete via `uv`.
3. **Comente o seu código:** Só você entende aquele loop *awk* em uma linha só. Deixe um comentário de compaixão para o próximo ninja que for editar isso.

> *"Trabalhe de forma inteligente, não duro. E se tiver que trabalhar duro, escreva um script para isso."*
