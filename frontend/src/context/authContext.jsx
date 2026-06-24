/* eslint-disable react-refresh/only-export-components */
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
        catch {
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
            return resultado
        }
        catch(erro){
            setUser(null)
            setIsAuthenticated(false)
            return {sucesso: false, mensagem: erro.message}
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
