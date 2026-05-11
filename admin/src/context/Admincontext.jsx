import{ useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { createContext } from "react"

const AdminContext=createContext() 

export const AdminProvider=({children})=>{
      const [adToken,setAdToken]=useState('') 
       console.log('the value of the token is:',adToken)

     useEffect(()=>{
        const token=localStorage.getItem('adToken') 
        setAdToken(token)
     },[])
        
  const value={adToken,setAdToken}
    return (
        <AdminContext.Provider value={value}>
           {children}
        </AdminContext.Provider>
    )
}

export const useAdmin=()=>{
    return useContext(AdminContext)
}
