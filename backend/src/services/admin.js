import User from '../models/user.model.js'
const findGuestForAdmin=async({usertype})=>{
   try{
      const user=await User.find({usertype})
      console.log('User data is:',user) 
      return user

   }catch(error){
    console.log('Error occur while fetching guest user for admin',error)
   }
}
export {findGuestForAdmin}
