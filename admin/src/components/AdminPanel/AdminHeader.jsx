import React from 'react'
import { useAdmin } from '../../context/Admincontext'
import {useNavigate} from 'react-router-dom'
const AdminHeader = () => { 
    const {adToken,setAdToken}=useAdmin()
    const navigate=useNavigate() 
    const logout=()=>{
        const confirmed=window.confirm('Are you sure want to logout') 
        if(!confirmed) return 
        adToken && localStorage.removeItem('adToken') 
        adToken && setAdToken('') 
        navigate('/')

    }
  return (
    <div className='flex justify-around items-center  px-6 md:px-10 py-5 bg-amber-200'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>This is Admin Panel</h1>
      <button onClick={logout} className='text-xl font-semibold hover:cursor-pointer'>Logout </button>
    </div>
  )
}

export default AdminHeader


// import { useAppcontext } from '../../context/AppContext';

// const NavbarOwner = () => {
//     const {user}=useAppcontext();
//   return (
//     <>
//       <div className='flex justify-center items-center px-6 md:px-10 py-1'>

//        <p className='text-xl text-black font-medium '>Welcome! {user?.firstname}{user?.lastname} </p>
//        {/* <p className='text-white'>Welcome,Sohan</p> */}
        
//       </div>  
//     </>
//   )
// }

// export default NavbarOwner
 