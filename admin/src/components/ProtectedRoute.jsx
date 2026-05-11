import React from 'react'
import { useAdmin } from '../context/Admincontext'
import { Navigate ,Outlet} from 'react-router-dom'
const ProtectedRoute = ({children}) => {
    const {adToken}=useAdmin()

    if(!adToken) {
        return <Navigate to='/login' replace/>
    }
    return <Outlet/>
}

export default ProtectedRoute
