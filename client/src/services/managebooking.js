import { toast } from "react-toastify";
import Axios from "../api/axios";

const ownerBooking=async(setBookings)=>{
      try {
      const {data}=await Axios.get('/api/booking/owner');
        data.success?setBookings(data.bookings):toast.error(data.message);
     } catch (error) {
        toast.error(error.response?.data?.message);
     }
}

const changeStatus=async(setBookings,{bookingId,status})=>{
  try { 
          // for the database 
          const { data } = await Axios.post("/api/booking/change-status", {
            bookingId,
            status,
          });
          if (data.success) {
            toast.success(data.message);
          //this is for frontend
            setBookings((prev) =>
              prev.map((b) => (b._id === bookingId ? { ...b, status } : b)),
            );
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message);
        }
}

const isPay=async(setBookings,bookingId,payallow,paymentStatus)=>{
     try {
        //  If payment is already done, block unclicking
        if (paymentStatus === "paid" && payallow === false) {
          toast.error("Payment already done. Cannot unclick the button.");
          // Revert checkbox UI immediately
          setBookings((prev) =>
            prev.map((b) =>
              b._id === bookingId ? { ...b, paymentAllowed: true } : b
            )
          );
          return;
        }
    
        // If payment is unpaid and host tries to unclick, ask confirmation
        if (paymentStatus === "unpaid" && payallow === false) {
          const confirmUnclick = window.confirm(
            "Are you sure you want to change the status?"
          );
          if (!confirmUnclick) {
            // Revert back if cancelled
            setBookings((prev) =>
              prev.map((b) =>
                b._id === bookingId ? { ...b, paymentAllowed: true } : b
              )
            );
            return;
          }
        }
    
        //  Proceed with normal update
        const { data } = await Axios.post("/api/booking/allowpayment", {
          bookingId,
          payallow,
        });
        
        if (data.success) {
          toast.success(data.message);
          setBookings((prev) =>
            prev.map((b) =>
              b._id === bookingId ? { ...b, paymentAllowed: payallow } : b
            )
          );
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to update payment permission");
      } 
}


const getUserBookings=async(setBookings)=>{
     try {
          const { data } = await Axios.get("/api/guestbooking/user");
          if (data.success) setBookings(data.bookings);
           
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
}


export {ownerBooking,changeStatus,isPay,getUserBookings}