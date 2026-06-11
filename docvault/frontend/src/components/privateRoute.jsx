import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function PrivateRoute() {
  const { usuario, carregando } = useAuth()

  if (carregando) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Carregando...</div>
  }

  return usuario ? <Outlet /> : <Navigate to="/login" replace />
}
