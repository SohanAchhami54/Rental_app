import { Axios } from "../api/axios"

const getUserData=async(setUser)=>{
    const data=await Axios.post('/api/admin/getuserdata')
}

export {getUserData}