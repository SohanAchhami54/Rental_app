import React from 'react'
import {Outlet} from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSideBar from './AdminSideBar'


const AdminLayout = () => {
  return (
    <div className='flex flex-col'>
      <AdminHeader/>
      <div className='flex'>
      <AdminSideBar/>
      <Outlet/>
      </div>
       
    </div>
  )
}

export default AdminLayout
