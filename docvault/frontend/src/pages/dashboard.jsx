import { useState } from "react"
function Dashboard(){
    return(
        <div>
            <h1 style={{color: '#220c46'}}>Seja bem vindo(a), usuario!</h1>
            <button className="btn mt-3" style={{backgroundColor: '#3b1b6d', color:'#f2f0f5', bordercolor: '#3b1b6d'}}>Sair</button>
        </div>
    )
}
export default Dashboard