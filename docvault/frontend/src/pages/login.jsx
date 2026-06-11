import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const { handleLogin } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    const resultado = await handleLogin(email, senha)
    if (!resultado.sucesso) {
      setErro(resultado.mensagem)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '0 1rem' }}>
      <h1 style={{ color: '#220c46' }}>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem' }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@exemplo.com"
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="senha" style={{ display: 'block', marginBottom: '0.25rem' }}>Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
        {erro && <div style={{ color: 'red', marginBottom: '1rem' }}>{erro}</div>}
        <button
          type="submit"
          style={{ backgroundColor: '#220c46', color: '#f2f0f5', border: 'none', padding: '0.5rem 1.5rem', cursor: 'pointer' }}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
