// import  { useEffect, useState } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'

// import { toast } from 'react-toastify';
// import Axios from '../../api/axios';

// const Success = () => {
//   const [search]=useSearchParams();
//   const [new_info,setNew_Info]=useState(null);
//   const [data,setData]=useState(null)
//   const info=search.get("data");
  
//   const navigate=useNavigate()

//   useEffect(()=>{
//       if(info){
//     try{
//       const decoded_info=atob(info); //decode base64
//        const final_result=JSON.parse(decoded_info);
//        console.log("final_result", final_result);
//        setNew_Info(final_result);
//     }catch(error){
//         toast.error("Invalid eSewa data:",error);
//     }
//   }
//   },[info])
  

//   const savePayment=async()=>{
//       try{
//       const bookingData=sessionStorage.getItem("paymentData");
//       const bookingId=bookingData?JSON.parse(bookingData).bookingId:null;

//       if(!bookingId){
//         toast.error("Booking ID not found in session")
//         return;
//       }


//      const {data}= await Axios.post('/api/guestbooking/payment-success',{
//         bookingId,
//         transactionCode:new_info.transaction_code,
//         total_amount:new_info.total_amount,
//         status:new_info.status
//       });
//       if(data.success){
//        toast.success(data.message);
//        setData(data.booking)
//        sessionStorage.removeItem('paymentData')
//       }
//     }catch(error){
//           toast.error(error.response?.data?.message);
//     }
//   }

//   console.log('payment data is:',data)
//   //to send the backend request after the component is loaded.
//    useEffect(()=>{
//     if(new_info){
//         savePayment();
//     }
    
//  },[new_info])

//  useEffect(()=>{
//   const handlePopState=()=>{
//     navigate('/mybooking',{replace:true})
//   }
//   window.addEventListener('popstate',handlePopState)
//   window.history.pushState(null,'',window.location.href)
//   return ()=>{
//     window.removeEventListener('popstate',handlePopState)
//   }
//  },[navigate])

//     return (
//     <div className='flex flex-col mt-10 items-center'>
//       {/* <Button> </Button> */}
//        <p>Payment successful</p>

//       {new_info ? (
//         <div className='flex flex-col space-y-3 mt-10 p-5 border-8 rounded-2xl md:p-10 bg-green-500'>
//           <p>Product Code: {new_info.product_code} </p>
//           <p>Total amount: {new_info.total_amount}</p>
//           <p>Status: {new_info.status}</p>
//           <p>Transaction Code: {new_info.transaction_code}</p>
//           <p>Transaction Id: {new_info.transaction_uuid} </p>
//           {data && (
//               <>
//                  <p>User:{data.user.firstname} {data.user.lastname}</p>
//                  <p> Brand:{data.bike.brand} Bike:{data.bike.category}</p>
//                  <p>Location:{data.bike.location}</p>
//               </>
//           )}
//           {/* <p>User:{data.user.firstname} {data.user.lastname}  </p> */}
//           {/* <p>Bike:{data.bike.category} </p>  */}
          
//         </div>
//       ) : (
//         <p className="text-red-500 mt-5">Loading payment details...</p>
//       )}
//     </div>
//   );
// }

// export default Success
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from '../../api/axios';

const Success = () => {
  const [search] = useSearchParams();
  const [new_info, setNew_Info] = useState(null);
  const [data, setData] = useState(null);
  const info = search.get("data");

  const navigate = useNavigate();

  useEffect(() => {
    if (info) {
      try {
        const decoded_info = atob(info); // decode base64
        const final_result = JSON.parse(decoded_info);
        console.log("final_result", final_result);
        setNew_Info(final_result);
      } catch (error) {
        toast.error("Invalid eSewa data:", error);
      }
    }
  }, [info]);

  const savePayment = async () => {
    try {
      const bookingData = sessionStorage.getItem("paymentData");
      const bookingId = bookingData ? JSON.parse(bookingData).bookingId : null;

      if (!bookingId) {
        toast.error("Booking ID not found in session");
        return;
      }

      const { data } = await Axios.post('/api/guestbooking/payment-success', {
        bookingId,
        transactionCode: new_info.transaction_code,
        total_amount: new_info.total_amount,
        status: new_info.status
      });

      if (data.success) {
        toast.success(data.message);
        setData(data.booking);
        sessionStorage.removeItem('paymentData');
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (new_info) savePayment();
  }, [new_info]);

  useEffect(() => {
    const handlePopState = () => {
      navigate('/mybooking', { replace: true });
    };
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);
    return () => {
       window.removeEventListener('popstate', handlePopState);
    }
  }, [navigate]);

  return (
    <section className="flex flex-col mt-10 items-center px-4">
      <p className="text-2xl font-semibold text-green-600">Payment successful</p>

      {new_info ? (
        <div className="flex flex-col space-y-3 mt-6 p-6 md:p-10 border-4 rounded-2xl bg-green-100 text-gray-800 w-full max-w-md">
          <p><span className="font-semibold">Product Code:</span> {new_info.product_code}</p>
          <p><span className="font-semibold">Total amount:</span> {new_info.total_amount}</p>
          <p><span className="font-semibold">Status:</span> {new_info.status}</p>
          <p><span className="font-semibold">Transaction Code:</span> {new_info.transaction_code}</p>
          <p><span className="font-semibold">Transaction Id:</span> {new_info.transaction_uuid}</p>

          {data && (
            <>
              <p><span className="font-semibold">User:</span> {data.user.firstname} {data.user.lastname}</p>
              <p><span className="font-semibold">Brand:</span> {data.bike.brand} <span className="font-semibold">Bike:</span> {data.bike.category}</p>
              <p><span className="font-semibold">Location:</span> {data.bike.location}</p>
            </>
          )}
        </div>
      ) : (
        <p className="text-red-500 mt-5">Loading payment details...</p>
      )}
    </section>
  );
};

export default Success;