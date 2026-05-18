import { Axios } from "../api/axios" 
import {toast} from 'react-toastify'

const adminLogin=async(formdata,setAdToken,setLoading)=>{
    try {
        const {data}=await Axios.post('/api/admin/login',{
            email:formdata.email, 
            password:formdata.password
        })
        if(data.success) {
            localStorage.setItem('adToken',data.data)
            setAdToken(data.data) 
            toast.success(data.message)
            setLoading(false)
        }
    } catch (error) {
       toast.error(error.response?.data?.message) 
    }
  
}
export {adminLogin}