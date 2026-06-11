import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/api'

function Register() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem. Por favor tente novamente')
      return
    }
    const resultado = await register(nome, email, senha)
    if (resultado.sucesso) {
      navigate('/login')
    } else {
      setErro(resultado.mensagem)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '0 1rem' }}>
      <h1 style={{ color: '#220c46' }}>CADASTRE-SE AQUI</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="nome" style={{ display: 'block', marginBottom: '0.25rem' }}>Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="ex: Chiquinha Silva"
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
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
            placeholder="Digite sua senha"
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
          <small>Sua senha deve ter de 8-10 caracteres, contendo pelo menos um carácter especial, letra maiúscula e número.</small>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="confirmarSenha" style={{ display: 'block', marginBottom: '0.25rem' }}>Confirmar senha</label>
          <input
            id="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirme sua senha"
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        {erro && <div style={{ color: 'red', marginBottom: '1rem' }}>{erro}</div>}
        <button
          type="submit"
          style={{ backgroundColor: '#220c46', color: '#f2f0f5', border: 'none', padding: '0.5rem 1.5rem', cursor: 'pointer' }}
        >
          Cadastre-se
        </button>
        <p><Link to="/login">Fazer login</Link></p>
      </form>
    </div>
  )
}

export default Register
