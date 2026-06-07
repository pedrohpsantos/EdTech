import { createContext, useContext, useState, useEffect } from "react";
import { login, logout, register, getMe } from "../services/api";
const AuthContext = createContext()
function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const checkAuth = async () => {
        try{
            const resultado = await getMe()
            if(resultado.sucesso == true){
                setUser(resultado.dados)
                setIsAuthenticated(true)
            }
        }
        catch(erro){
            setUser(null)
            setIsAuthenticated(false)
        }
        finally{
            setIsLoading(false)
        }
        }
    const handleLogin = async (email, senha) => {
        try{
            const resultado = await login(email, senha)
            if(resultado.sucesso == true){
                setUser(resultado.dados)
                setIsAuthenticated(true)
            }
        }
        catch(erro){
            setUser(null)
            setIsAuthenticated(false)
        }
    }
    const handleLogout = async () => {
        await logout()
        setUser(null)
        setIsAuthenticated(false)
    }
    const handleRegister = async (nome, email, senha) => {
        const resultado = await register(nome, email, senha)
        return resultado
    }
    useEffect(()=> {
        checkAuth()
    },[])
    return(
        <AuthContext.Provider value={{handleLogin, handleLogout, handleRegister, checkAuth, user, isAuthenticated, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
export const useAuth = () => useContext(AuthContext)
