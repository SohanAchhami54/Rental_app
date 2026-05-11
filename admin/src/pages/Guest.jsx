import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUserData } from '../services/user'

const Guest = () => {
  const [user,setUser]=useState('')
  const getUserInfo=async()=>{
     await getUserData(setUser)
  }
   useEffect(()=>{
     getUserInfo()
   },[])
  return (
    <div className='pt-8 pl-2 md:pl-5'>
       
      <h1>This is guest page.</h1>

    </div>
  )
}

export default Guest
