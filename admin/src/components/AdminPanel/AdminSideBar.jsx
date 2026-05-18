import React from 'react'
import {NavLink} from 'react-router-dom'
import { FaUser } from "react-icons/fa"
import { FaUserTie } from "react-icons/fa"
import { FaMotorcycle } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa"
import { FaCalendarCheck } from "react-icons/fa"
const AdminSideBar = () => {
   const isActive = ({isActive}) => {
    return `flex items-center justify-center gap-2 ${isActive ? 'text-blue-700' : 'text-gray-700'}`
}
  return (
    <>
      <div  className='fixed left-0 z-40 flex flex-col gap-6
      items-start pt-8 px-2 sm:px-5 md:px-6
      max-w-10  md:max-w-40 w-full bg-gray-50
      font-medium min-h-screen 
      text-xs sm:text-sm md:text-sm'>
        <NavLink  to={'/'} className={isActive}>
            <FaUser />
            <span className='hidden md:flex'>Guest</span>
        </NavLink>
       
        <NavLink  to={'/host'} className={isActive}>
            <FaUserTie />
            <span  className='hidden md:flex'>Owner</span>
        </NavLink>

          <NavLink  to={'/ownerbike'} className={isActive}>
            <FaMotorcycle />
            <span  className='hidden md:flex'>Ownerbike</span>
        </NavLink> 

           <NavLink  to={'/purchasebike'} className={isActive}>
             <FaShoppingCart />
            <span  className='hidden md:flex'>Purchasebike</span>
        </NavLink> 

             <NavLink  to={'/userbooking'} className={isActive}>
            <FaCalendarCheck />
            <span  className='hidden md:flex'>Userbooking</span>
             </NavLink>  
    </div>
    </>
  )
}
export default AdminSideBar
