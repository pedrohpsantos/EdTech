import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
 
function PrivateRoute ({children}){
    const {isAuthenticated, isLoading} = useAuth()
    if (isLoading == true){
        return (<div className="spinner-border" role="status"></div>)
    }
    if (!isAuthenticated){
        return <Navigate to="/login"/>
    }
    return children
}
export default PrivateRoute