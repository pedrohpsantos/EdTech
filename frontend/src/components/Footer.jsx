export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        padding: '2rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)' }}>
        © {new Date().getFullYear()} EdTech AILAB Makers
      </p>
      <a
        href="/about"
        style={{
          fontSize: '14px',
          color: 'var(--accent)',
          textDecoration: 'none',
          fontWeight: '500',
        }}
      >
        Sobre o Projeto
      </a>
    </footer>
  );
}
