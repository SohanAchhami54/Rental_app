      import { createContext, useContext, useEffect, useState } from "react";
    import Axios from "../api/axios";
      import {toast} from 'react-hot-toast';

      const AppContext=createContext();
      export const AppProvider=({children})=>{
          console.log('App Provider is mounted');
          const currency=import.meta.env.VITE_CURRENCY;
          const [token,setToken]=useState(localStorage.getItem('userToken'));
          const [user,setUser]=useState('');
          const [isLogged,setIsLogged]=useState(false);
          const [showLogin,setShowLogin]=useState(false);
          const [pickupDate, setPickupDate] = useState('');
          const [returnDate,setReturnDate]=useState('');
          const [bike,setBike]=useState([]);
          const [loadingUser,setLoadingUser]=useState(true);

          //function to check if the user is loggedin
          const fetchUser=async()=>{
              try {
              const {data}= await Axios.get('/api/user/data') //to extract the data from the database.
              if(data.success){
                  // console.log("data of the user is:", data);
                  setUser(data.user);
                  setIsLogged(true);
                
              }else{
                  //navigate('/');
                  localStorage.removeItem('userToken');
                  setToken(null);
                  setIsLogged(false);
              }
            
              } catch (error) {
                  toast.error(error.message);
              }finally{
                setLoadingUser(false)
              }
          }

      //function to fetch all the bike from the server.
      const fetchBikes=async()=>{
          try{
              const {data}=await  Axios.get('/api/user/bikes');
              console.log('Fetched bikes:',data);
              data.success?setBike(data.bikes):toast.error(data.message);
            }catch(error){
              console.log(error.message);
          }
      }


      //function to logout the user
      const logout=()=>{
        const confirmed=window.confirm('Are u sure want to logout')
        if(!confirmed) return 
          localStorage.removeItem('userToken')
          setToken(null);
          setUser(null);
          setIsLogged(false);
          toast.success('You have been logout')
      }

    //this runs for the first time or when the app is reload
      //useEffect to retrieve the token from localstorage
        useEffect(()=>{
            const token=localStorage.getItem('userToken');
            setToken(token); //especially reload vayeko belama kam lagney vayo
            fetchBikes();
        },[]);

      //useeffect to fetch the user data when the token is available
        useEffect(()=>{
        if(token){ 
          console.log('token from useeffect is:',token)
          fetchUser()
          setIsLogged(true); //mark user as a logged in 
        }
        else{
          setIsLogged(false);
          setLoadingUser(false)
        }
        },[token])

          const value={
          currency,user,setUser,token,setToken,fetchUser,showLogin,
            setShowLogin,logout,fetchBikes,bike,setBike,pickupDate,setPickupDate,returnDate,setReturnDate,
            loadingUser,isLogged
          }
          return(
              <>
              <AppContext.Provider value={value}> 
                    {children}
              </AppContext.Provider>
              </>
          )
      }

      export const useAppcontext=()=>{
          return useContext(AppContext);
      }