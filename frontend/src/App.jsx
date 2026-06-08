import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import AuthProvider from "./context/authContext";
import PrivateRoute from "./components/privateRoute";
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
</Routes>
</BrowserRouter>
</AuthProvider>
)
}
export default App