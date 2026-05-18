import React from 'react'
import {Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Owner from './pages/Owner'
import AdminLayout from './components/AdminPanel/AdminLayout'
import OwnerBike from './pages/OwnerBike'
import PurchasedBike from './pages/PurchasedBike'
import UserBooking from './pages/UserBooking'
import Guest from './pages/Guest'
import Login from './pages/Login'
import { useAdmin } from './context/Admincontext'
import ProtectedRoute from './components/ProtectedRoute'
import {Navigate} from 'react-router-dom'
import NotFound from './pages/NotFound'

const App = () => {
  const {adToken,loading}=useAdmin()
  if(loading) return <div>Loading.........</div>
  return (
    <>
    <ToastContainer/>
        <Routes>
                 <Route path='/login' element={adToken? <Navigate to='/' replace />: <Login/> } />
                 <Route path='/' element={<AdminLayout/>}>
                 <Route  element={<ProtectedRoute/>}>
                 <Route index element={<Guest/>}/> 
                 <Route path='/host' element={<Owner/>}/> 
                 <Route path='/ownerbike' element={<OwnerBike/>}/> 
                 <Route path='/purchasebike' element={<PurchasedBike/>}/> 
                 <Route path='/userbooking' element={<UserBooking/>}/> 
                 </Route>
            </Route>
                <Route path="*" element={<NotFound/>}></Route>
        </Routes>

    </>
  )
}

export default App
