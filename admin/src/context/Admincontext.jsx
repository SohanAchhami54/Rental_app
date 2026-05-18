import{ useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { createContext } from "react"

const AdminContext=createContext() 

export const AdminProvider=({children})=>{
      const [adToken,setAdToken]=useState('') 
      const [loading,setLoading]=useState(true)
       console.log('the value of the token is:',adToken)

     useEffect(()=>{
        const token=localStorage.getItem('adToken') 
        if(token){
            setAdToken(token) 
        }else{
            setAdToken('')
        }
        setLoading(false)
     },[])
        
         useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('adToken')
            if (!token) {
                setAdToken('')
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [])


  const value={adToken,setAdToken,loading,setLoading}
    return (
        <AdminContext.Provider value={value}>
           {children}
        </AdminContext.Provider>
    )
}

export const useAdmin=()=>{
    return useContext(AdminContext)
}
