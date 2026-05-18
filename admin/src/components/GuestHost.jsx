import React from 'react'

const GuestHost = ({owner,getBikeInfo}) => {
  return (
    <>
      <li key={owner._id} className='bg-amber-300 p-1 md:p-2 rounded-xl flex-shrink-0'
                 onClick={()=> getBikeInfo(owner._id)}> 
          <h1 className='text-xs md:text-sm font-medium tracking-wider hover:cursor-pointer'>{owner?.firstname.toUpperCase()} {owner?.lastname.toUpperCase()}</h1>
          </li>
    </>
  )
}

export default GuestHost
