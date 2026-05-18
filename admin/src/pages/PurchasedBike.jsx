import React from 'react'
import AdminHeading from '../components/AdminHeading'
import { useState } from 'react'
import { useEffect } from 'react'
import { getPurchaseBike } from '../services/bike'
import OwnerBikePic from '../components/OwnerBikePic'
import PurchaseBike from '../components/PurchaseBike'

const PurchasedBike = () => {
  const [purchaseBike,setPurchaseBike]=useState([])

  const getPurchaseBikeInfo=async()=>{
    const response= await getPurchaseBike()
    setPurchaseBike(response)
  }

  useEffect(()=>{
     getPurchaseBikeInfo()
  },[])
  console.log('purchase bike for admin is:',purchaseBike)
  return (
    <>
    <div className='ml-12 sm:ml-20 md:ml-40  md:px-10 mt-5 overflow-hidden'>
         <AdminHeading heading='Purchased Bike' subheading='View all purchase bike by user' />
      
          <ul className='mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4'>
        { 
         purchaseBike?.map((b)=>{
            return (
              <PurchaseBike b={b} />
            )
        })}
      </ul>
    </div> 
    </>
  )
}

export default PurchasedBike
