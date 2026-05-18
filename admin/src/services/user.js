import { toast } from "react-toastify"
import { Axios } from "../api/axios"

const getUserData=async()=>{
    try{
        const {data}=await Axios.get('/api/admin/getuserdata')
        if(data.success){
           return data.data
        }
    }catch(error){
        toast.error(error.response?.data?.message) 
    }
   
}

const getOwnerData=async()=>{
   try {
    const {data}=await Axios.get('/api/admin/getownerdata') 
    if(data.success){
        return data.data
    }
   } catch (error) {
       toast.error(error.response?.data?.message) 
   }
}

export {getUserData,getOwnerData}