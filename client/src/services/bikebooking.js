import { toast } from "react-toastify";
import Axios from "../api/axios";


const bikeBooking=async({id,pickupDate,returnDate},navigate)=>{
    try {
      const {data}=await Axios.post('/api/booking/create',{bikeId:id,pickupDate,returnDate})
      if(data.success){
        toast.success(data.message)
         navigate('/mybooking')
      }
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
}


export {bikeBooking}


 