import { toast } from "react-toastify"
import { Axios } from "../api/axios"

const getOwnerBikeData=async(ownerid)=>{
    try {
         const {data}=await Axios.get('/api/admin/getownerbike',{params:{ownerid}}) 
         if(data.success){
          return data.data || []
        }
    } catch (error) {
         toast.error(error.response?.data?.message) 
    }
}

const toggleBike=async(bikeid)=>{
   try {
    const {data}=await Axios.patch('/api/admin/togglebikeavailable',{bikeid}) 
    if(data.success){
        toast.success(data.message)
    }
   } catch (error) {
        toast.error(error.response?.data?.message) 
   }
}


const getPurchaseBike=async()=>{
    try {
        const {data}=await Axios.get('/api/admin/purchasebike')
        if(data.success){
            return data.data
        }
    } catch (error) {
      toast.error(error.response?.data?.message) 
    }
}

const getUserBookingData=async()=>{
    try {
        const {data}=await Axios.get('/api/admin/userbookingdata')
        if(data.success){
            return data.data
        }
    } catch (error) {
         toast.error(error.response?.data?.message) 
    }
}

export {getOwnerBikeData,toggleBike,getPurchaseBike,getUserBookingData}