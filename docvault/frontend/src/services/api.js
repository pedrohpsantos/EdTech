const BASE_URL = import.meta.env.VITE_API_URL

export const login = async (email, senha) => {
  try {
    const resposta = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, senha }),
    })
    if (!resposta.ok) {
      const erro = await resposta.json()
      throw new Error(
        erro.message || 'Erro ao realizar o login. Verifique seus dados e tente novamente',
      )
    }
    const dados = await resposta.json()
    return { sucesso: true, dados }
  } catch (erro) {
    return { sucesso: false, mensagem: erro.message }
  }
}

export const register = async (nome, email, senha) => {
  try {
    const resposta = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ nome, email, senha }),
    })
    if (!resposta.ok) {
      const erro = await resposta.json()
      throw new Error(
        erro.message || 'Erro ao realizar o cadastro. Por favor verifique os dados e tente novamente.',
      )
    }
    const dados = await resposta.json()
    return { sucesso: true, dados }
  } catch (erro) {
    return { sucesso: false, mensagem: erro.message }
  }
}

export const logout = async () => {
  try {
    const resposta = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    if (!resposta.ok) {
      const erro = await resposta.json()
      throw new Error(erro.message || 'Falha ao encerrar sessão')
    }
    return { sucesso: true }
  } catch (erro) {
    return { sucesso: false, mensagem: erro.message }
  }
}

export const getMe = async () => {
  try {
    const resposta = await fetch(`${BASE_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include',
    })
    if (!resposta.ok) {
      const erro = await resposta.json()
      throw new Error(erro.message || 'Usuário não logado.')
    }
    const dados = await resposta.json()
    return { sucesso: true, usuario: dados }
  } catch (erro) {
    return { sucesso: false, mensagem: erro.message }
  }
}
