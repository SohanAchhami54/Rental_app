import { AsyncError } from "../utils/Asyncerror.js";
import { findGuestForAdmin, findOwnerBikeforAd, findOwnerForAdmin, purchaseBike, userBookingData } from "../services/admin.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js"
import { generateTokenForAdmin } from "../utils/auth.js";
import { bikeAvailability, findBikeData } from "../services/bike.js";





const userDataforAdmin=AsyncError(async(req,res,next)=>{
   const userData=await findGuestForAdmin({usertype:'guest'})
   if(!userData) return next(new ErrorHandler('Userdata not found',400)) 
    res.status(200).json({success:true,data:userData})
})

const adminLogin=AsyncError(async(req,res,next)=>{
    const {email,password}=req.body || {}

    if(!email || !password) return next(new ErrorHandler('Both field are required',400))
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASS){
       const jwttoken=generateTokenForAdmin({email}) 
       if(!jwttoken) return next(new ErrorHandler('Fail to receive token',400))
       res.cookie('adToken',jwttoken,{
        httpOnly:true, 
        secure:false, 
        sameSite:'lax', 
        maxAge:24*60*60*1000
       })
       res.status(200).json({success:true,message:'Admin Login',data:jwttoken})
    }
})

const ownerDataforAdmin=AsyncError(async(req,res,next)=>{
   const ownerData=await findOwnerForAdmin({usertype:'host'}) 
   if(!ownerData) return next(new ErrorHandler('OwnerData not found',400)) 
   res.status(200).json({success:true,data:ownerData})

})


const ownerBikeforAdmin=AsyncError(async(req,res,next)=>{
    const {ownerid}=req.query 
    if(!ownerid) return next(new ErrorHandler('Owner id not define',400))
    const bike=await findOwnerBikeforAd(ownerid)
    if(!bike) return next(new ErrorHandler('Owner Bike not found',400))
 
    res.status(200).json({success:true,data:bike})
})

const toggleBikeForAdmin=AsyncError(async(req,res,next)=>{
    const {bikeid}=req.body  
    if(!bikeid) return next(new ErrorHandler('Owner id not define',400)) 
    const bike=await findBikeData(bikeid) 
    if(!bike) return next(new ErrorHandler('Bike not found',400))
    await bikeAvailability(bike)
    res.status(200).json({success:true,message:'Availability Toggle'})
})

const purchaseBikeForAdmin=AsyncError(async(req,res,next)=>{
    const purchasebike=await purchaseBike()
    if(!purchasebike) return next(new ErrorHandler('Purchase bike not found',400)) 
    res.status(200).json({success:true,data:purchasebike})
})

const userBookingForAdmin=AsyncError(async(req,res,next)=>{
    const bookingdata=await userBookingData()
     if(!bookingdata) return next(new ErrorHandler('Booking data not found',400)) 
     res.status(200).json({success:true,data:bookingdata}) 
})

export {userDataforAdmin,adminLogin,ownerDataforAdmin,ownerBikeforAdmin,toggleBikeForAdmin,purchaseBikeForAdmin,userBookingForAdmin}   
