import  { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppcontext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Success = () => {
  const {axios}=useAppcontext();
  const [search]=useSearchParams();
  const [new_info,setNew_Info]=useState(null);
  const info=search.get("data");
  
  useEffect(()=>{
      if(info){
    try{
      const decoded_info=atob(info); //decode base64
       const final_result=JSON.parse(decoded_info);
       console.log("final_result", final_result);
       setNew_Info(final_result);
    }catch(error){
        toast.error("Invalid eSewa data:",error);
    }
  }
  },[info])
  

  const savePayment=async()=>{
      try{
      const bookingData=sessionStorage.getItem("paymentData");
      const bookingId=bookingData?JSON.parse(bookingData).bookingId:null;

      if(!bookingId){
        toast.error("Booking ID not found in session")
        return;
      }


     const {data}= await axios.post('/api/guestbooking/payment-success',{
        bookingId,
        transactionCode:new_info.transaction_code,
        total_amount:new_info.total_amount,
        status:new_info.status
      });
      if(data.success){
       toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }
  //to send the backend request after the component is loaded.
   useEffect(()=>{
    if(new_info){
        savePayment();
    }
    
 },[new_info])

  
    return (
    <div className='flex flex-col mt-10 items-center'>
      <p>Payment successful</p>

      {new_info ? (
        <div className='flex flex-col space-y-3 mt-10 p-5 border-8 rounded-2xl md:p-10 bg-green-500'>
          <p>Total amount: {new_info.total_amount}</p>
          <p>Status: {new_info.status}</p>
          <p>Transaction Code: {new_info.transaction_code}</p>
        </div>
      ) : (
        <p className="text-red-500 mt-5">Loading payment details...</p>
      )}
    </div>
  );
}

export default Success
