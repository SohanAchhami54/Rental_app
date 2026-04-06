import { ErrorHandler } from '../middleware/errorMiddleware.js';
import { findBikeData } from '../services/bike.js';
import { bookingS, bookingUpdate, finalScore, findBookByUser,findBookingById, findBookingOwner } from '../services/booking.js';
import { AsyncError } from '../utils/Asyncerror.js';
import { makeBooking } from '../services/booking.js';



// For booking the bike
const createBooking =AsyncError(async (req, res,next) => {
    const { _id } = req.user;

    const { bikeId, pickupDate, returnDate } = req.body;
    if(pickupDate>returnDate) return next(new ErrorHandler('Pickup Date cannot be exceed return Date.'))
    
    // Fetch bike details
    const bikeData=await findBikeData(bikeId)
    if(!bikeData) return next (new ErrorHandler('Bike not found',400))
    
    //if already the bike booking is created by this user.
    const userbooking=await findBookByUser({user:_id})
    const matchBooking=userbooking.filter((b)=>b.bike.toString()===bikeId?b.bike:'')
    
    if(matchBooking) return next(new ErrorHandler('Bike already booked',400))
    
    
    const {priorityScore,price}=finalScore(bikeData,pickupDate,returnDate)
    // Save booking with priority
    const booking= await makeBooking({bike:bikeId,owner:bikeData.owner, user:_id,pickupDate,returnDate,price,priorityScore})
    
  

    if(!booking) return next(new ErrorHandler('Booking not created',400))
    res.status(200).json({success:true,message:'Booking created Successfully',priorityScore})

});



// API to get the owner bookings (dashboard data)
const getOwnerBookings =AsyncError(async (req, res) => {

    if (req.user.usertype !== 'host') 
      return next(new ErrorHandler('Unauthorized',400))

    const bookings = await findBookingOwner({owner:req.user._id})
    res.status(200).json({ success: true, bookings });
});


// For confirming and cancelling bookings
const changeBookingStatus =AsyncError(async (req, res,next) => {

       const {_id}=req.user 
       const {bookingId,status}=req.body 
       const booking=await findBookingById({_id:bookingId})
       if(!booking) return next(new ErrorHandler('Booking not found',400)) 
      
      if(booking.owner.toString()!==_id.toString()) return next(new ErrorHandler('Unauthorized',400))
      
    
      if(booking.payment.pricestatus==='unpaid' && status==='confirmed'){
        return next (new ErrorHandler('Payment has not been done yet',400))
      }
  
      if(booking.payment.pricestatus==='paid'){
       return next(new ErrorHandler('Payment has already done. Cannot change status',400))
      }
      await bookingS(booking,status)
      res.status(200).json({success:true,message:'Status Updated'})
});

// Allow or disable payment for a booking
const allowpayment = AsyncError(async (req, res,next) => {
    const { bookingId, payallow } = req.body;
    
    const booking=await bookingUpdate(bookingId,payallow)
    if (!booking) return next (new ErrorHandler('Booking not found',400))
  
    res.status(200).json({ success: true,  message: payallow ? 'Payment enabled for user' : 'Payment disabled'});

});

export { createBooking, getOwnerBookings, changeBookingStatus, allowpayment };
