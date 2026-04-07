import { toast } from 'react-toastify';
import Axios from '../api/axios';
const userSignup=async(formData,navigate)=>{
     try{
       const { data } = await Axios.post('/api/user/signup', formData);
       if(data.success){
        toast.success('Register Successfully Please login.')
        navigate('/')
       }
     }catch(error){
        toast.error(error.response?.data?.message);
     }
}

const userLogin=async(formData,setToken,navigate)=>{ 
    try{
        const {data}=await Axios.post('/api/user/login',formData)
       if(data.success){
         console.log('usertoken',data.data)
         localStorage.setItem('userToken',data.data)
         setToken(data.data)
         toast.success('login Successfully') 
         navigate('/')
    }
    }catch(error){
        console.log('Error occur while login:',error)
        toast.error(error.response?.data?.message);
    }
}

export {userSignup,userLogin}