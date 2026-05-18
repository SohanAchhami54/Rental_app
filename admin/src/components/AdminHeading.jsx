import React from 'react'

const AdminHeading = ({heading,subheading}) => {
  return (
   <div className='mb-5'>
        <h1 className='text-2xl font-semibold'>{heading}</h1>
        <p className='text-sm text-gray-500'>
          {subheading}
        </p>
      </div>
  )
}

export default AdminHeading
