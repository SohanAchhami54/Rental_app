import { toast } from "react-toastify";
import Axios from "../api/axios"

const fetchOwnerB=async(setBike)=>{
    try {
      const {data}=await Axios.get('/api/owner/bikes');
      if(data.success){
          setBike(data.bikes);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
}


const toggleBikeAvailable=async({bikeId})=>{
   try {
    const {data}= await Axios.post('/api/owner/toggle-bike',{bikeId},);
    if(data.success){
      toast.success(data.message);
    }
  } catch (error) {
     toast.error(error.response?.data?.message);
  }
}

const deleteB=async({bikeId})=>{
     try {
            const confirm =window.confirm('Are you sure want to delete the Bike?');//either we get true or false.
            if(!confirm) return null;//true nai xaina vaney yo hunxa.
    
            const {data}=await Axios.post('/api/owner/delete-bike',{bikeId});
            if(data.success){
              toast.success(data.message);
            }
          } catch (error) { 
             toast.error(error.response?.data?.message);
          }
}

const addBike=async(image,bike,setImage)=>{
      try {
      const formData = new FormData()
       image && formData.append('image', image)
       formData.append('bikeData', JSON.stringify(bike))
       const { data } = await Axios.post('/api/owner/addbike', formData ,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      if (data.success) {
        toast.success(data.message)
        setImage(null)
      }
    } catch (error) {
       toast.error(error.response?.data?.message);
    } 
}

const fetchDashData=async(setData)=>{
   try {
       const {data}=await Axios.get('/api/owner/dashboard')
             if(data.success){
               setData(data.dashboardData);
             }
           } catch (error) {
              toast.error(error.response?.data?.message);
           }
}

const updateHostImage=async(image,setImage)=>{
      try {
      const formData=new FormData();
      formData.append('image',image);
      const {data}=await Axios.patch('/api/owner/updateimage',formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      });
      if(data.success){
  
        toast.success(data.message);
        setImage('');
      }

     } catch (error) {
         toast.error(error.response?.data?.message);
     }
}

export {fetchOwnerB,toggleBikeAvailable,deleteB,addBike,fetchDashData,updateHostImage}