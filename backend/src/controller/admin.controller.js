import { AsyncError } from "../utils/Asyncerror.js";
import { findGuestForAdmin } from "../services/admin.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js"
import { generateTokenForAdmin } from "../utils/auth.js";





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


export {userDataforAdmin,adminLogin}   