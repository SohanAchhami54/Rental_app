import User from '../models/user.model.js'
import Bike from '../models/bike.model.js'
import PurchaseBikes from '..//models/purchasebike.model.js'
import Booking from '../models/booking.model.js'
const findGuestForAdmin=async({usertype})=>{
   try{
      const user=await User.find({usertype}).select('-password')
      console.log('User data is:',user) 
      return user

   }catch(error){
    console.log('Error occur while fetching guest user for admin',error)
   }
}
const findOwnerForAdmin=async({usertype})=>{ 
   try {
      const owner=await User.find({usertype}).select('-password') 
      return owner
   } catch (error) {
      console.log('Error occur while fetching owner for admin',error)
   }
}

   const findOwnerBikeforAd=async(ownerid)=>{
      try {
      const allbike=await  Bike.find({owner:ownerid})
      return allbike

      return bike
      } catch (error) {
         console.log('Error occur while fetching ownerbike for admin',error)
      }
   }


   const purchaseBike=async()=>{
      try {
         const bike= await PurchaseBikes.find().populate('booking bike user owner')
         return bike
      } catch (error) {
          console.log('Error occur while fetching purchasebike for admin',error)
      }
   }
  
   const userBookingData=async()=>{
      try {
         const bookingdata=await Booking.find().populate('bike user owner')
         return bookingdata 
      } catch (error) {
         console.log('Error occur while fetching bookingbike for admin',error)
      }
   }

export {findGuestForAdmin,findOwnerForAdmin,findOwnerBikeforAd,purchaseBike,userBookingData}
