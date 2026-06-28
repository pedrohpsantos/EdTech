import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/dashboard";
import AuthProvider from "./context/authContext";
import PrivateRoute from "./components/privateRoute";
import Documentos from "./pages/documentos";
import About from "./pages/About";
import Footer from "./components/Footer";

function App(){
  return(<AuthProvider>
<BrowserRouter>
<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/recover-password" element={<Recovery/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/dashboard" element={
    <PrivateRoute>
      <Dashboard/>
    </PrivateRoute>}/>
  <Route path="/documentos" element={
    <PrivateRoute>
      <Documentos/>
    </PrivateRoute>}/>
</Routes>
<Footer />
</div>
</BrowserRouter>
</AuthProvider>
)
}
export default App