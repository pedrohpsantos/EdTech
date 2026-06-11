import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe, login as apiLogin, logout as apiLogout } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    verificarSessao()
  }, [])

  async function verificarSessao() {
    const resultado = await getMe()
    if (resultado.sucesso) {
      setUsuario(resultado.usuario)
    }
    setCarregando(false)
  }

  async function handleLogin(email, senha) {
    const resultado = await apiLogin(email, senha)
    if (resultado.sucesso) {
      setUsuario(resultado.dados)
      navigate('/dashboard')
    }
    return resultado
  }

  async function handleLogout() {
    await apiLogout()
    setUsuario(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
