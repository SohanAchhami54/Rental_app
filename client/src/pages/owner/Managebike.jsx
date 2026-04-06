import { useEffect, useState } from 'react'
import Title from './Title';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useAppcontext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import Axios from '../../api/axios';
import { deleteB, fetchOwnerB, toggleBikeAvailable } from '../../services/owner';

const Managebike = () => {
const {currency}=useAppcontext();
const [bike,setBike]=useState([]);

const fetchOwnerBikes=async()=>{
   await fetchOwnerB(setBike)

}

const toggleAvailability=async(bikeId)=>{
   await toggleBikeAvailable({bikeId})
  fetchOwnerBikes();

 
}

  const deleteBike=async(bikeId)=>{
    await deleteB({bikeId})
      fetchOwnerBikes(); //data base bata feri naya data lai fetch garna ko lagi.
  }
useEffect(()=>{  //whenver the component is loaded.
  fetchOwnerBikes();
},[])
  return (
    <>
      <div className='px-4 pt-5 md:px-10 w-full'>
         <Title title='Manage Bike' subTitle='View all the bike, update the details,or remove them from the booking platform. ' />
         {/* for the table  */}
         <div className=' border mt-6 rounded-lg  w-full max-w-5xl '>
          <table className='w-full text-left text-sm  text-gray-500'>
            {/* this is for table head  */}
              <thead className='text-gray-600  '>
                <tr>
                    <th className=' font-medium px-3 py-2 '>Bike</th>
                    <th className='font-medium px-3 py-2 max-md:hidden '>Category</th>
                    <th className='font-medium px-3 py-2'>Price</th>
                    <th className='font-medium px-3 py-2 max-md:hidden '>Status</th>
                    <th className='font-medium px-3 py-2'>Action</th>
                </tr>
              </thead>
     
                 <tbody>

      {
         bike?.map((bike,index)=>{
           return <tr key={index} className='border-t borderColor'>
             {/* td ma flex so  */}
             
                  {/* first data  */}
                   <td className='p-3 flex items-center gap-3'>
                   {/* first element  */}
                    <img src={bike.image}  className='h-12 w-12 aspect-square object-cover rounded-md' alt="" />
                    {/* mobile ma chai yo hidden hunxa  */}
                   <div className='max-md:hidden flex flex-col gap-1'>
                    <p className='font-medium'>{bike.model}{bike.brand} </p>
                    <p className='font-medium'>{bike.transmission} </p>
                   </div>
                   </td>

                  {/* second data  */}
                   <td className='p-3 max-md:hidden'>{bike.category} </td>

              {/* third data  */}
              <td className='p-3'>{currency} {bike.pricePerDay}/day </td>

              {/* fourth data  */}
               <td className='max-md:hidden p-3  '>
                 <span  className={`px-2 py-1 rounded ${bike.isAvailable?'bg-green-300':'bg-red-300'}`}
                 >{bike.isAvailable ?'Available':'Unavailable'} </span>
                </td>

             {/* fifth data  */}
                 <td className='p-3'>
                  {/* <div className='flex gap-2 justify-around items-center'>
                   {bike.isAvaliable ?
                   <FaRegEyeSlash  onClick={()=> toggleAvailability(bike._id,false)}
                   className='text-lg'/>
                   :<FaRegEye    onClick={() => toggleAvailability(bike._id, true)} 
                    className='text-lg'  />}
                   <MdDeleteForever className='text-xl text-red-600' />

                 </div> */}

                 <div className='flex gap-2  justify-around items-center'>
                  {bike.isAvailable?
                   <FaRegEye onClick={()=>toggleAvailability(bike._id)}
                   className='text-lg'/>
                   :
                   <FaRegEyeSlash  onClick={()=>toggleAvailability(bike._id)}
                   className='text-lg'/>

                    }
                    <MdDeleteForever onClick={()=>deleteBike(bike._id)}
                      className='text-xl text-red-600' />
                 </div>
                 </td>
                  </tr>
                   })
                }
                 
                 </tbody>

          </table>
              
         </div>
      </div>
    </>
  )
}

export default Managebike
