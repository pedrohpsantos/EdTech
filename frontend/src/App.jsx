import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import AuthProvider from "./context/authContext";
import PrivateRoute from "./components/privateRoute";
import Documentos from "./pages/documentos";
function App(){
  return(<AuthProvider>
<BrowserRouter>
<Routes>
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/dashboard" element={
    <PrivateRoute>
      <Dashboard/>
    </PrivateRoute>}/>
  <Route path="/documentos" element={
    <PrivateRoute>
      <Documentos/>
    </PrivateRoute>}/>
</Routes>
</BrowserRouter>
</AuthProvider>
)
}
export default App