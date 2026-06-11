import { useAuth } from '../context/authContext'

function Dashboard() {
  const { usuario, handleLogout } = useAuth()

  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 1rem' }}>
      <h1 style={{ color: '#220c46' }}>
        Seja bem vindo(a), {usuario?.nome || usuario?.name || 'usuário'}!
      </h1>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#3b1b6d',
          color: '#f2f0f5',
          border: 'none',
          padding: '0.5rem 1.5rem',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
      >
        Sair
      </button>
    </div>
  )
}

export default Dashboard
