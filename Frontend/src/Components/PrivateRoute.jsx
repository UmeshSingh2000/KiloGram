import { Navigate, Outlet } from "react-router-dom"

import Loader from "./Loader/Loader"
import { useSelector } from "react-redux"


const PrivateRoute = () => {
    // const { isAuthenticated, loading } = useAuth()
    const {isAuthenticated,loading} = useSelector((state)=>state.auth)
    
    if (loading || isAuthenticated === null) {
        return <Loader />
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute
