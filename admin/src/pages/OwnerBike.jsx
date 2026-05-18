import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getOwnerData } from '../services/user'
import { getOwnerBikeData } from '../services/bike'
import OwnerBikePic from '../components/OwnerBikePic'
import GuestHost from '../components/GuestHost'
import AdminHeading from '../components/AdminHeading'

const OwnerBike = () => {
  const [owner,setOwner]=useState([]) 
  const [ownerBike,setOwnerBike]=useState([])
  const [activeOwner,setActiveOwner]=useState(null)

 const getOwnerInfo = async () => {
    const response = await getOwnerData()
    setOwner(response)

    if(response && response.length>0){
        const firstOwner=response[0]._id //first user
        setActiveOwner(firstOwner)
        getBikeInfo(firstOwner)
    }
  }
  useEffect(() => {
    getOwnerInfo()
  }, [])
  
  const getBikeInfo=async(ownerid)=>{
    const response=await getOwnerBikeData(ownerid)
    setOwnerBike(response)
  }

  console.log('owner  data is:',owner)
  console.log('owner bike data is:',ownerBike)

  return (
    <div className='ml-12 sm:ml-20 md:ml-40  md:px-10 mt-5 overflow-hidden '>
      <AdminHeading heading='OwnerBike Page' subheading='View all Owner BIke' />
    
    <div className='relative'>
     
      <ul className='sticky top-15  flex flex-row gap-2 overflow-x-auto  mt-5  sm:top-20  pb-2  md:max-w-4xl
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] '>
          {
            owner?.map((owner)=>{ 
              return (
                  <GuestHost owner={owner} getBikeInfo={getBikeInfo} /> 
              )
            })
            }
            
       </ul>
       {ownerBike.length===0?(
         <div className='mt-5 font-semibold text-xs sm:text-base md:text-md lg:text-2xl'>
            There is no bike of this Owner
          </div>
       ):(
            <ul className='mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4'>
        { 
         ownerBike.map((ownerBike)=>{
            return (
               <OwnerBikePic ownerBike={ownerBike} setOwnerBike={setOwnerBike}/>
            )
        })}
      </ul>
       )}
     
    </div>
  </div>
  )
}
export default OwnerBike
