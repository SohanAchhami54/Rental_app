import React, { useEffect, useState } from 'react'
import { getOwnerData } from '../services/user'
import AdminHeading from '../components/AdminHeading'

const Owner = () => {

  const [owners, setOwners] = useState([])

  // default image
  const defaultImage =
    'https://cdn-icons-png.flaticon.com/512/149/149071.png'

  // fetch owner data
  const getOwnerInfo = async () => {
    const response = await getOwnerData()
    setOwners(response)
  }

  useEffect(() => {
    getOwnerInfo()
  }, [])

  console.log('Owner data is:', owners)

  return (

    <div className='ml-12 md:ml-40 pt-5 md:px-10 w-full'>

      {/* heading */}
      <AdminHeading heading='Owner Users' subheading='View all registered owner users information.' />

      {/* table container */}
      <div className='border mt-6 rounded-xl w-full max-w-6xl overflow-x-auto'>

        <table className='w-full text-left text-sm text-gray-500'>

          {/* table head */}
          <thead className='text-gray-600 bg-gray-50'>

            <tr>

              <th className='font-medium px-4 py-3'>
                Owner
              </th>

              <th className='font-medium px-4 py-3 max-md:hidden'>
                User Type
              </th>

              <th className='font-medium px-4 py-3 max-md:hidden'>
                Address
              </th>

              <th className='font-medium px-4 py-3'>
                Email
              </th>

            </tr>

          </thead>

          {/* table body */}
          <tbody>

            {
              owners?.map((ownerData) => {
                const {
                  _id,
                  firstname,
                  lastname,
                  usertype,
                  address,
                  email,
                  image
                } = ownerData

                return (

                  <tr
                    key={_id}
                    className='border-t hover:bg-gray-50 transition'
                  >

                    {/* owner column */}
                    <td className='p-3'>

                      <div className='flex items-center gap-3'>

                        {/* image */}
                        <img
                          src={image || defaultImage}
                          alt='owner-image'
                          className='w-12 h-12 rounded-full object-cover border'
                        />

                        {/* name */}
                        <div className='flex flex-col gap-1'>

                          <p className='text-sm font-medium text-gray-800'>
                            {firstname} {lastname}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* user type */}
                    <td className='p-3 max-md:hidden'>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${usertype === 'owner'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-800'
                          }`}
                      >
                        {usertype}
                      </span>

                    </td>

                    {/* address */}
                    <td className='p-3 max-md:hidden'>
                      {address}
                    </td>

                    {/* email */}
                    <td className='p-3'>
                      {email}
                    </td>

                  </tr>

                )
              })
            }

          </tbody>

        </table>

      </div>

    </div>

  )
}

export default Owner