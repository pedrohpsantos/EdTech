import { useState } from "react"
import { Link } from "react-router-dom"
function Register(){
    return(
        <div className="container">
        <h1 style={{color: '#220c46'}}>CADASTRE-SE AQUI</h1>
        <div className="d-flex justify-content-center">
            <div className="col-md-4">
               
                <div className="col-2">
            <label className="form-label">Nome</label>
                </div>
            <input className="form-control w-10" type="text" placeholder="ex: Chiquinha Silva" aria-label="nome" />
                
                <div className="col-2">
            <label className="form-label mt-3">Email</label>
                </div>
            <input className="form-control w-10" type="email" placeholder="nome@exemplo.com" aria-label="email"/>
            
            <div className="col-2">
            <label className="form-label mt-3">Senha</label>
            </div>
            <input className="form-control w-10" type="password" placeholder="Digite sua senha" aria-describedby="senhaHelp"/>
            <div id="senhaHelp" className="form-text" style={{width:'83%'}}>
                Sua senha deve ter de 8-10 caracteres
            </div>
            
            <div className="col-5">
            <label className="form-label mt-3">Confirmar senha</label>
            </div>
            <input className="form-control w-10" type="password" placeholder="Confirme sua senha" aria-label="Confirme a senha"/>
        <button className="btn mt-3" style={{backgroundColor: '#220c46', color:'#f2f0f5', bordercolor: '#220c46'}}>Cadastre-se</button>
             <p><Link to="/login">Fazer login</Link></p>
            </div>
        </div>
    </div>
    )
}
export default Register