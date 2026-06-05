import { useState } from "react"
import { Link } from "react-router-dom"
function Login(){
    return(
    <div className="container">
        <h1 style={{color: '#220c46'}}>LOGIN</h1>
        <div className="d-flex justify-content-center">
            <div className="col-md-4">
                <div className="col-2">
            <label className="form-label">Email</label>
                </div>
            <input className="form-control w-10" type="email" placeholder="nome@exemplo.com" aria-label="email"/>
            <div className="col-2">
            <label className="form-label mt-3">Senha</label>
            </div>
            <input className="form-control w-10" type="password" aria-label="senha"/>
            <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
        <button className="btn mt-3" style={{backgroundColor: '#220c46', color:'#f2f0f5', bordercolor: '#220c46'}}>Entrar</button>
            </div>
        </div>
    </div>
    )
}
export default Login