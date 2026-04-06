import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../shadcnui/button";
import { useAppcontext } from "../context/AppContext";
import { RiMotorbikeLine } from "react-icons/ri";
import { BsFuelPump } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";

import { bikeBooking } from "../services/bikebooking";
import { toast } from "react-toastify";
const BikeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const {user, bike,currency,pickupDate,setPickupDate,returnDate,setReturnDate}=useAppcontext();
  const [bikes, setBikes] = useState(null);
 
  // console.log(bike);

 //to handle the form details
 const handleSubmit=async(e)=>{
   e.preventDefault();
    if(user){
      await bikeBooking({id,pickupDate,returnDate},navigate)
      setPickupDate('')
      setReturnDate('')
    } else{
    toast.error('User not login')
    setPickupDate('')
    setReturnDate('')
    }
    
 }

  useEffect(() => {
    //when the id changes it display the value of that particular id.
     setBikes(bike.find((bike) => bike._id === id));  //useAppContext bata aayeko bike ho yo.
  }, [bike, id]);

  return bikes ? (
    <>
      {/* this is the individual bike details */}
      <div className="px-6 md:px-16 lg:px-24  xl:px-32 mt-16">
        {/* //jun page bata bike ko details lai click gareko ho 
      // yo button click garisakey paxi paila kai page ma aai puginxa. */}
        <Button
          onClick={() => {navigate(-1);scrollTo(0,0)}}
          className="bg-black text-white flex  items-center gap-2 mb-6 cursor-pointer"
        >
          Back to all Bikes
        </Button>
      
       {/* this line seperate the new left side and right side of the bikedetails page */}

        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* this is the left bike image */}
          <div className="lg:col-span-2">
            <img
              src={bikes.image}
              alt={bikes.brand}
              className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md "
            />
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">
                  {/* brand model */}
                  {bikes.brand}
                  {bikes.model}{" "}
                </h1>
                {/* bike model and year */}
                <p className="text-lg">
                  {bikes.category} . {bikes .year}{" "}
                </p>
              </div>
              <hr className="my-6" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center">
                  <BsFuelPump className="text-xl" />
                   <p>{bikes.fuel_type} </p>
                </div>
                <div className="flex flex-col items-center">
                  <RiMotorbikeLine className="text-xl" />
                   <p>{bikes.transmission} </p>
                </div>
                <div className="flex flex-col items-center">
                 <MdOutlineLocationOn className="text-xl" />
                   <p>{bikes.location} </p>
                </div>
              </div>
            </div>
       {/* description */}
            <div>
               <h1 className="text-xl font-medium m-3">Description</h1>
               <p className="text-gray-600">{ bikes.description} </p>
            </div>

            {/* Features */}
          <div>
              <h1 className="text-xl font-medium m-3">Features</h1>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {
                      ['Adjustable suspension','ABS',
                        'Durable wheels'].map((item)=>{
                          return <li key={item} className="flex items-center ">
                             {/* <img src={assets.check_icon} className="h-4 mr-2" alt="" /> */}
                              {item}
                          </li>
                        })
                    }
               </ul>
          </div>
          </div>


          {/* this is for the right bike image */}
         <form action="" onSubmit={handleSubmit}
          className="h-max sticky top-18 p-6 shadow-xl rounded-lg">
              <p className="text-xl font-bold flex items-center justify-between ">
                {currency}{bikes.pricePerDay} <span className="font-normal text-gray-600">per day </span></p>
            <hr className=" border my-6" />
         

         {/* this is the pickup date */}
            <div className="flex flex-col gap-2">
              {/* pickup date */}
               <label  htmlFor="pickup-date">Pickup Date</label>
                <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)}
                type="date" id='pickup-date' className="border  px-3 py-2 rounded-lg"
                //  give the current date and time and split only take yyyy-mm-dd
                  min={new Date().toISOString().split('T')[0]}
               required />
               {/* return date */}
               <label htmlFor="return-date">Return Date</label>
               <input value={returnDate} onChange={(e)=>setReturnDate(e.target.value)}
                type="date" id='return-date' className="border  px-3 py-2 rounded-lg"
               required />
               <Button className="text-lg text-white bg-black">Book now</Button>
               <p className="text-center py-1 text-sm">No Credit card require to reserve</p>
            </div>

         </form>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default BikeDetails;
