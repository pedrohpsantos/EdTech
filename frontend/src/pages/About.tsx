export default function About() {
  return (
    <div
      style={{
        padding: '40px 20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'left',
        flex: 1,
      }}
    >
      <a
        href="/"
        style={{
          display: 'inline-block',
          marginBottom: '24px',
          color: 'var(--accent)',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        &larr; Voltar
      </a>

      <h1>Sobre o Projeto EdTech</h1>
      <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '40px' }}>
        O EdTech é uma plataforma moderna desenvolvida para simplificar o envio, análise e aprovação
        de documentos acadêmicos entre orientadores e pesquisadores, promovendo um fluxo de trabalho
        ágil e rastreável.
      </p>

      <h2>Equipe AILAB Makers</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        <div
          style={{
            padding: '16px',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            backgroundColor: 'var(--code-bg)',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-h)' }}>Pedro Henrique P. Santos</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--accent)' }}>Tech Lead</p>
        </div>

        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-h)' }}>
            Arthur Leite (arthurlleite)
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>Padawan - FullStack</p>
        </div>

        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-h)' }}>
            Alana Feitosa (alanafeitosa-ui)
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>Padawan - FullStack</p>
        </div>

        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-h)' }}>
            Mateus Araújo (mateusaraujo2006)
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>Padawan - FullStack</p>
        </div>

        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-h)' }}>
            Mariana Farias (mariana-farias12)
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>Padawan - FullStack</p>
        </div>

        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-h)' }}>
            Luis G. Ferreira Nunes (LuisGFNunes)
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>Padawan - FullStack</p>
        </div>
      </div>
    </div>
  );
}
