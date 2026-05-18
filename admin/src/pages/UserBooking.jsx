import React from 'react'
import AdminHeading from '../components/AdminHeading'
import { useState } from 'react'
import { useEffect } from 'react'
import { getUserBookingData } from '../services/bike'

const UserBooking = () => {
  const [userbooking,setUserBooking]=useState([]) 

  const getUserBookingInfo=async()=>{
   const response= await getUserBookingData() 
   setUserBooking(response)
  }

  useEffect(()=>{
    getUserBookingInfo()
  },[])
  return (
    <div className='ml-12 sm:ml-20 md:ml-40  md:px-10 mt-5 '>
         <AdminHeading heading='User Booking' subheading='View all booking made by user' />
      
          <ul className='mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4'>
        { 
         userbooking?.map((b)=>{
            return (
            <li key={b._id} className='relative shadow-xl rounded-2xl group hover:translate-y-2 transition-all duration-200 ease-linear'>
             <div className=' p-4 space-y-3'>
                 <div className='object-cover overflow-hidden rounded-xl '>
               <img src={b.bike.image} className='h-60 w-full object-cover rounded-xl group-hover:scale-105 transition-all duration-200 ease-in' alt='hostimage'/>

               <span className={` ${b.status==='confirmed'?'bg-green-500':b. status==='pending'?'bg-blue-500':'bg-red-500'} text-white text-xs  lg:text-base rounded-md px-3 py-1 absolute top-7 left-6 `}> {b.status} </span>

              </div>
        
              <div className='text-xs sm:text-base md:text-md '>
                             <h1 className='font-semibold'>{b.bike.brand}  {b.bike.model}</h1>
                             <span className='font-semibold'>{b.bike.year} </span>
                            </div>

                            <div className='flex items-center justify-between text-xs sm:text-base md:text-sm lg:text-md '>
                             <span className='font-medium'>{b.bike.category} {b.bike.transmission} </span>
                            </div>
                            
                            <div className='flex flex-wrap gap-2 text-xs md:text-base'>
                              <span>PickupDate:{b.pickupDate.split('T')[0]} </span>
                              <span>ReturnDate:{b.returnDate.split('T')[0]} </span>
                            </div>
                            <div className='flex flex-wrap gap-2 text-xs md:text-base'>
                              <span>Owner: {b.owner.firstname}{b.owner.lastname}</span>
                              <span className='underline'>Booked by: {b.user.firstname.charAt(0).toUpperCase()+b.user.firstname.slice(1)} {b.user.lastname} </span>
                              <span>{b.priorityScore}{b.status} </span>
                            </div>
                        </div>
            </li>
            )
        })}
      </ul>
    </div> 
  )
}

export default UserBooking
