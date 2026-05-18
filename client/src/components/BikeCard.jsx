//this is bike component and this page show all the bike details  
import { useNavigate } from "react-router-dom";
import { RiMotorbikeLine } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsFuelPump } from "react-icons/bs";
import { useAppcontext } from "../context/AppContext";
const BikeCard = ({bike,isHost}) => {
 const {currency}=useAppcontext();
 const navigate=useNavigate();
 const handleClick=()=>{
    if(!isHost ){
      navigate(`/bikedetail/${bike._id}`)
    }
 }
  return (
   <>
     {/* this function is used to go to the individual webpage of each bike */}
     {/* <div onClick={()=>{navigate(`/bikedetail/${bike._id}`);scrollTo(0,0)}} */}
       <div onClick={handleClick}
      className='group rounded-xl overflow-hidden shadow-lg   transition-all duration-500
       hover:translate-y-2 cursor-pointer'>
        {/* this is for image */}
        <div className='relative h-50 w-full overflow-hidden'>
            <img src={bike.image} alt="bike image" className='w-full h-full object-cover transition-all duration-500 ease   hover:scale-105' />
            {bike.isAvailable&& <p className='absolute top-4 left-4 bg-blue-600 text-white text-xs
            px-2.5 py-1 rounded-full'>Available now</p>}
            <div className='absolute bottom-4 right-4 bg-black text-white px-3 py-2 rounded-lg'>
               <span className='font-semibold'>{currency}{bike.pricePerDay} </span>
               <span className='text-sm text-white/80'>/day</span>
            </div>
        </div>
        {/* this is for details */}
        <div className="p-4 sm:p-8 ">
            {/* this is for bike name */}
            <div>
            <h3 className="text-lg font-medium">{bike.brand} {bike.model} </h3>
            <p>{bike.category} {bike.year}</p>
           </div>
           <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 items-center h-20 text-gray-600">
                    {/* fuel icon */}
                   <div className="flex items-center text-sm  gap-2">  
                    <BsFuelPump className="text-xl" />

                    <span className="text-xs sm:text-sm">{bike.fuel_type} </span>
                 </div>
                   {/* this is for bike icon */}
                   <div className="flex items-center text-sm  gap-2">  
                    <RiMotorbikeLine  className="text-xl" />
                    <span  className="text-xs sm:text-sm">{bike.transmission} </span>
                 </div>
                   {/* this is for location  */}
                   <div className="flex items-center text-sm  gap-2">  

                    <MdOutlineLocationOn className="text-xl" />
                    <span className="text-xs sm:text-sm">{bike.location} </span>
                 </div>
           </div>
        </div>
     </div>
   </>
  )
}
//we can mount this component in any page.
export default BikeCard
