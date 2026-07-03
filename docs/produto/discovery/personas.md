# Personas do Usuário

As personas orientam as Histórias de Usuário, as jornadas e as decisões de arquitetura e design do EdTech. Elas foram construídas com base no perfil típico de pesquisadores e docentes universitários.

---

<div class="grid cards" markdown>


-   :material-account-school: __Persona 1: Ana Silva__

    ---

    **A Pesquisadora Mestranda**

    - **Idade:** 25 anos

    - **Cargo:** Estudante de Mestrado / Iniciação Científica

    - **Fluência Digital:** Alta

    *"Preciso de um lugar seguro onde eu consiga enviar meus artigos e os datasets pesados da pesquisa sem medo de perder ou vazar antes da publicação."*

-   :material-account-tie: __Persona 2: Prof. Carlos Mendes__

    ---

    **O Orientador / Pesquisador Sênior**

    - **Idade:** 52 anos

    - **Cargo:** Professor Titular e Coordenador de Laboratório

    - **Fluência Digital:** Média

    *"Eu oriento 8 alunos de diferentes projetos. Minha caixa de e-mail é um caos, perco o controle de quem me mandou a versão final de qual artigo."*

-   :material-shield-account: __Persona 3: Márcia Oliveira__

    ---

    **A Auditora de Compliance**

    - **Idade:** 45 anos

    - **Cargo:** Analista Administrativa / DPO (Data Protection Officer)
    - **Fluência Digital:** Alta (sistemas corporativos)

    *"Se houver vazamento de uma patente ou pesquisa embargada, preciso saber exatamente quem acessou o documento e a que horas, de forma irrefutável."*

</div>


---

## Detalhamento das Personas

### 1. Ana (Pesquisadora)

Ana representa a ponta operacional. Ela produz o conteúdo acadêmico (artigos, relatórios, códigos, datasets) e depende da aprovação do seu orientador.


- **Objetivos Principais:**
    - Centralizar as entregas das suas pesquisas sem usar o próprio Google Drive pessoal.

    - Ter a garantia de que o seu documento foi entregue, recebido e está em análise.

- **Dores Atuais (Pain Points):**
    - Perda de histórico de versões de documentos.

    - Dificuldade em enviar anexos pesados (arquivos de imagens médicas ou grandes datasets) junto ao PDF do artigo.

    - O e-mail não fornece feedback claro do status da submissão.

- **O que espera do EdTech:**
    - Uma interface limpa, moderna e intuitiva (padrão Notion/Google Drive).

    - Funcionalidade "*drag and drop*" para envio ágil dos artigos e anexos.

    - Visibilidade clara sobre o *status* do seu documento (ex: Rascunho, Em Revisão, Aprovado).

### 2. Prof. Dr. Carlos (Orientador)

Carlos é o validador. Ele supervisiona várias frentes de pesquisa, coordena bolsas e assina a autoria final junto com os alunos. Seu tempo é escasso e ele precisa de foco.


- **Objetivos Principais:**
    - Visualizar e gerenciar as entregas dos alunos de forma segmentada por projeto/laboratório.

    - Aprovar, rejeitar ou solicitar alterações nos documentos com rastreabilidade.

- **Dores Atuais (Pain Points):**
    - Gerenciamento de submissões misturado na caixa de e-mail institucional com dezenas de outros assuntos.

    - Risco alto de enviar a pesquisa de um aluno para outro por engano.

    - Dificuldade de saber rapidamente quais alunos estão com entregas pendentes.

- **O que espera do EdTech:**
    - **Isolamento visual:** Ao entrar, quer ver um painel apenas com as submissões dos seus orientandos.

    - Uma interface que exija poucos cliques para visualizar o PDF ou dataset do aluno.

    - Alertas sobre quais alunos estão com pendências ou precisam de feedback.

### 3. Márcia (Auditora / Compliance)

Márcia representa a segurança e a gestão da universidade. Ela não avalia o conteúdo acadêmico, mas se preocupa com a conformidade (LGPD), propriedade intelectual e controle de acessos.


- **Objetivos Principais:**
    - Garantir que apenas pessoas autorizadas estão visualizando pesquisas em andamento (sigilosas).

    - Ter ferramentas para responder rapidamente a incidentes de vazamento de dados acadêmicos ou quebra de patentes.

- **Dores Atuais (Pain Points):**
    - Sistemas atuais (ou a falta deles) não registram quem baixou um arquivo, apenas quem o subiu.

    - Falta de logs de ações caso precise conduzir uma auditoria forense.

- **O que espera do EdTech:**
    - **Logs Inalteráveis:** Um histórico imutável (quem logou, qual IP, quem baixou o documento X).

    - Painel exclusivo com visão gerencial/auditoria que destaque tentativas de acessos indevidos (*ACCESS_DENIED*).

    - Exportação simplificada de relatórios de evidências e logs de sistema.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 04/06/2026 | Detalhamento completo das personas com padrão de mercado | Pedro Henrique P. Santos |
| `1.2` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |

