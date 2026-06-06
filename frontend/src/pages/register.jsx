import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {register} from '../services/api'
function Register(){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [erro, setErro] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async() => {
            if(senha!= confirmarSenha){
                setErro('As senhas não coincidem. Por favor tente novamente')
                return
            }
            try{
                const resultado = await register(nome, email, senha)
                if(resultado.sucesso == true){
                    navigate ('/login')
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
        <h1 style={{color: '#220c46'}}>CADASTRE-SE AQUI</h1>
        <div className="d-flex justify-content-center">
            <div className="col-md-4">
               
                <div className="col-2">
            <label className="form-label">Nome</label>
                </div>
            <input className="form-control w-10" type="text" value={nome} onChange={(evento)=>setNome(evento.target.value)} placeholder="ex: Chiquinha Silva" aria-label="nome" />
                
                <div className="col-2">
            <label className="form-label mt-3">Email</label>
                </div>
            <input className="form-control w-10" type="email" value={email} onChange={(evento)=>setEmail(evento.target.value)} placeholder="nome@exemplo.com" aria-label="email"/>
            
            <div className="col-2">
            <label className="form-label mt-3">Senha</label>
            </div>
            <input className="form-control w-10" type="password" value={senha} onChange={(evento)=>setSenha(evento.target.value)} placeholder="Digite sua senha" aria-describedby="senhaHelp"/>
            <div id="senhaHelp" className="form-text" style={{width:'83%'}}>
                Sua senha deve ter de 8-10 caracteres, contendo pelo menos um carácter especial, letra maiúscula e número.
            </div>
            
            <div className="col-5">
            <label className="form-label mt-3">Confirmar senha</label>
            </div>
            <input className="form-control w-10" type="password" value={confirmarSenha} onChange={(evento)=>setConfirmarSenha(evento.target.value)} placeholder="Confirme sua senha" aria-label="Confirme a senha"/>
            {erro && <div className="alert alert-danger">{erro}</div>}
        <button className="btn mt-3" onClick={handleSubmit} style={{backgroundColor: '#220c46', color:'#f2f0f5', bordercolor: '#220c46'}}>Cadastre-se</button>
             <p><Link to="/login">Fazer login</Link></p>
            </div>
        </div>
    </div>
    )
}
export default Register