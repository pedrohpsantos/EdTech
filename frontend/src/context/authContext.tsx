/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login, logout, register, getMe } from "../services/api";
import { User, ApiResponse } from "../types";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    handleLogin: (email: string, senha: string) => Promise<ApiResponse<any>>;
    handleRegister: (nome: string, email: string, senha: string) => Promise<ApiResponse<any>>;
    handleLogout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const checkAuth = async () => {
        try {
            const resultado = await getMe();
            if (resultado.sucesso && resultado.dados) {
                setUser(resultado.dados);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (email: string, senha: string): Promise<ApiResponse<any>> => {
        try{
            const resultado = await login(email, senha)
            if(resultado.sucesso == true && resultado.dados){
                setUser(resultado.dados)
                setIsAuthenticated(true)
            }
            return resultado
        }
        catch(erro: any){
            setUser(null)
            setIsAuthenticated(false)
            return {sucesso: false, mensagem: erro.message}
        }
    }
    const handleLogout = async (): Promise<void> => {
        await logout()
        setUser(null)
        setIsAuthenticated(false)
    }
    const handleRegister = async (nome: string, email: string, senha: string): Promise<ApiResponse<any>> => {
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
export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
