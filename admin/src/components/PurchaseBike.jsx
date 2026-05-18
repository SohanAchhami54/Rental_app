import React from 'react'

const PurchaseBike = ({b}) => {
  return (
    <>
          <li key={b._id} className='shadow-xl rounded-2xl group hover:translate-y-2 transition-all duration-200 ease-linear'>
             <div className=' p-4 space-y-3'>
                 <div className='object-cover overflow-hidden rounded-xl '>
               <img src={b.bike.image} className='h-60 w-full object-cover rounded-xl group-hover:scale-105 transition-all duration-200 ease-in' alt='hostimage'/> 
             
              </div>
        
              <div className='text-xs sm:text-base md:text-md '>
                            <h1 className='font-semibold'>{b.bike.brand}  {b.bike.model}</h1>
                             <span className='font-semibold'>{b.bike.year} </span>
                            </div>
                             
                            <div className='flex items-center justify-between text-xs sm:text-base md:text-sm lg:text-md '>
                             <span className='font-medium'>{b.bike.category} {b.bike.transmission} </span>
                            </div>
                            
                            <div className='flex flex-wrap gap-2 text-xs md:text-base'>
                              <span>PickupDate:{b.booking.pickupDate.split('T')[0]} </span>
                              <span>ReturnDate:{b.booking.returnDate.split('T')[0]} </span>
                            </div>
                            <div className='flex flex-wrap gap-2 text-xs md:text-base'>
                              <span>Owner:{b.owner.firstname}{b.owner.lastname}</span>
                              <span className='underline'>Purchased by:{b.user.firstname.charAt(0).toUpperCase()+b.user.firstname.slice(1)} {b.user.lastname} </span>
                              <span>{b.status} </span>
                              
                            </div>
                        </div>
            </li>
    </>
  )
}

export default PurchaseBike
