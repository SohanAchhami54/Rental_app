import Booking from '../models/booking.model.js'
// Helper function to calculate booking priority
// Greedy based Priority Algorithm
const calculatePriority = (pickupDate, returnDate, bookingDate) => {
  const pickup = new Date(pickupDate);
  const returnD = new Date(returnDate);
  const booking = new Date(bookingDate);

  // Duration of booking in days
  const durationInDays = (returnD - pickup) / (1000 * 60 * 60 * 24);

  // Urgency (gap between booking and pickup)
  const urgencyInDays = (pickup - booking) / (1000 * 60 * 60 * 24);

  // Scoring logic
  const urgencyScore = Math.max(0, 10 - urgencyInDays);
  const durationScore = Math.min(durationInDays, 10);

  // Weighted final score
  return (2 * urgencyScore) + durationScore;
};

const finalScore=(bikeData,pickupDate,returnDate)=>{
   // Calculate booking duration in days
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noofdays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = bikeData.pricePerDay * noofdays;

    // Calculate priority score (using today's date as bookingDate)
    const bookingDate = new Date();
    const priorityScore = Math.floor(calculatePriority(pickupDate, returnDate, bookingDate));
    return { priorityScore,price}
}

const makeBooking=async({bike,owner, user,pickupDate,returnDate,price,priorityScore})=>{
    try{
      const booking=await Booking.create({bike,owner,user,pickupDate,returnDate,price,priorityScore})
      return booking
    }catch(error){
      console.log('Error occured:',error)
    }
}


const bookingUpdate=async(bookingId,payallow)=>{
  try{
     const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentAllowed: payallow },
      { new: true }
    );
    return booking
  }catch(error){
    console.log('Error occured:',error)
  }
}


const findBookingById=async({_id})=>{
   try{
      const booking= await Booking.findById({_id})
      return booking
   }catch(error){
    console.log('Error:',error)
   }
}

const findBookByUser=async({user})=>{
   try{
    const booking =await Booking.find({user})
    return booking 
   }catch(error){
    console.log('Error:',error)
   }
}


const  bookingS=async(booking,status)=>{
  booking.status=status 
  await booking.save()
}

const findBookingOwner=async({owner})=>{
  try{
    const booking= await Booking.find({owner}).populate('bike user').select('-password').sort({createdAt:-1})
    return booking
  }catch(error){
    console.log('Error occured:',error)
  }
}

const deleteBooking=async({user})=>{
   await Booking.deleteMany({ user, returnDate: { $lt: new Date() } });
}

const findMybooking=async({user})=>{
  try{
     const booking=await Booking.find({user}).populate('bike').sort({createdAt:-1})
     return booking
  }catch(error){
     console.log('Error occured:',error)
  }
}

export {finalScore,makeBooking,bookingUpdate,findBookingById,bookingS,findBookingOwner,findBookByUser,deleteBooking,findMybooking}