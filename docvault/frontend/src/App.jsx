import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import PrivateRoute from './components/privateRoute'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
