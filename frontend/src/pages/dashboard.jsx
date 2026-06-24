
import { useNavigate } from "react-router-dom"
import {useAuth} from "../context/authContext"
import ThemeToggle from "../components/themeToggle"
function Dashboard(){
    const {user, handleLogout} = useAuth()
    const navigate = useNavigate()
    const handleSair = async() => {
            await handleLogout()
            navigate ('/login')
    }
    return(
        <div>
            <h1 style={{color: '#220c46'}}>Seja bem vindo(a), {user?.name}!</h1>
            <button className="btn mt-3" onClick={handleSair} style={{backgroundColor: '#3b1b6d', color:'#f2f0f5', bordercolor: '#3b1b6d'}}>Sair</button>
            <button className="btn mt-3 ms-2 btn-info" onClick={() => navigate('/documentos')}>Ver Documentos</button>
            <ThemeToggle/>
        </div>
    )
}
export default Dashboard