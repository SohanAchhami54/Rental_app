import React, { useEffect, useState } from 'react'
import { getUserData } from '../services/user'
import AdminHeading from '../components/AdminHeading'

const Guest = () => {

  const [user, setUser] = useState([])

  const getUserInfo = async () => {
    const response = await getUserData()
    setUser(response)
  }

  console.log('user data is:', user)

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className='ml-12 md:ml-40 pt-5 md:px-10 w-full'>

      {/* heading */}

      <AdminHeading heading='Guest Users' subheading='View all registered guest users information.' />
      

      {/* table container */}
      <div className='border mt-6 rounded-lg w-full max-w-6xl overflow-x-auto'>

        <table className='w-full text-left text-sm text-gray-500'>

          {/* table head */}
          <thead className='text-gray-600 bg-gray-50'>
            <tr>
              <th className='font-medium  px-3 py-3'>Name</th>
              <th className='font-medium px-3 py-3 max-md:hidden'>
                User Type
              </th>
              <th className='font-medium px-3 py-3 max-md:hidden'>
                Address
              </th>
              <th className='font-medium px-3 py-3'>
                Email
              </th>
            </tr>
          </thead>

          {/* table body */}
          <tbody>

            {
              user?.map((userData, index) => {
                return (

                  <tr key={index} className='border-t'>

                    {/* first column */}
                    <td className='p-3'>
                      <div className='flex flex-col gap-1'>
                        <p className='text-sm font-medium text-gray-800'>
                          {userData.firstname} {userData.lastname}
                          
                        </p>
                        
                      </div>
                    </td>

                    {/* second column */}
                    <td className='p-3 max-md:hidden'>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium
                        ${userData.usertype === 'guest'
                            ? 'bg-green-200 text-green-700'
                            : 'bg-blue-200 text-blue-700'
                          }`}
                      >
                        {userData.usertype}
                      </span>
                    </td>

                    {/* third column */}
                    <td className='p-3 max-md:hidden'>
                      {userData.address}
                    </td>

                    {/* fourth column */}
                    <td className='p-3'>
                      {userData.email}
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

export default Guest