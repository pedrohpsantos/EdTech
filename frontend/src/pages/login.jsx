import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext" 
function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const navigate = useNavigate()
    const {handleLogin} = useAuth()
    const handleSubmit = async() => {
        try{
            const resultado = await handleLogin(email,senha)
            if(resultado.sucesso == true){
                navigate ('/dashboard')
            }else {
                setErro(resultado.mensagem)
            }
        }
        catch(erro){
            setErro(erro.message)
        }
    }
    return(
    <div className="container">
        <h1 style={{color: '#220c46'}}>LOGIN</h1>
        <div className="d-flex justify-content-center">
            <div className="col-md-4">
                <div className="col-2">
            <label className="form-label">Email</label>
                </div>
            <input className="form-control w-10" type="email" value={email} onChange={(evento)=> setEmail(evento.target.value)} placeholder="nome@exemplo.com" aria-label="email"/>
            <div className="col-2">
            <label className="form-label mt-3">Senha</label>
            </div>
            <input className="form-control w-10" type="password"  value={senha} onChange={(evento)=> setSenha(evento.target.value)} aria-label="senha"/>
            <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
            {erro && <div className="alert alert-danger">{erro}</div>}
        <button className="btn mt-3" onClick={handleSubmit} style={{backgroundColor: '#220c46', color:'#f2f0f5', bordercolor: '#220c46'}}>Entrar</button>
            </div>
        </div>
    </div>
    )
}
export default Login