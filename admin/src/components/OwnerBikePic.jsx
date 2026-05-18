import React from 'react'
import { useState } from 'react'
import { IoEye } from "react-icons/io5"
import { IoEyeOff } from "react-icons/io5"
import { toggleBike } from '../services/bike'

const OwnerBikePic = ({ownerBike,setOwnerBike}) => {
    const toggleOwnerBikeForAdmin=async(bikeid)=>{
         await toggleBike(bikeid) 

         setOwnerBike(prev=>
            prev.map(bike=>(
               bike._id===bikeid 
               ?{...bike,isAvailable:!bike.isAvailable}
               :bike 
            ))
         )
    }
   return (
    <>
      <li key={ownerBike._id} className='shadow-xl rounded-2xl group hover:translate-y-2 transition-all duration-200 ease-linear'>
            <div className=' p-4 space-y-3'>
                <div className='object-cover overflow-hidden rounded-xl '>
                  <img src={ownerBike.image} className='h-60 w-full object-cover rounded-xl group-hover:scale-105 transition-all duration-200 ease-in' alt='hostimage'/>
                  </div>
        
                  <div className='text-xs sm:text-base md:text-md '>
                  <h1 className='font-semibold'>{ownerBike.brand}  {ownerBike.model}</h1>
                  <span className='font-semibold'>{ownerBike.year} </span>
                  </div>

                <div className='flex items-center justify-between text-xs sm:text-base md:text-sm lg:text-md '>
                <span className='font-medium'>{ownerBike.category} {ownerBike.transmission} </span>
                <span onClick={()=>toggleOwnerBikeForAdmin(ownerBike._id)} className='text-sm md:text-xl'>
                      {
                          ownerBike.isAvailable?(
                              <IoEye /> 
                               ):(
                                 <IoEyeOff />
                              )}
                              </span>      
                          </div>
                      </div>
             </li>
    </>
  )
}

export default OwnerBikePic
