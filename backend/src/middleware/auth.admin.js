import { AsyncError } from "../utils/Asyncerror.js"
import { decodeTokenForAdmin } from "../utils/auth.js"
import { ErrorHandler } from "./errorMiddleware.js"


const isProtectedAdmin=AsyncError(async(req,res,next)=>{
    const {adToken}=req.cookies 
    if(!adToken) return next(new ErrorHandler('Token not found',400)) 
    const token_decode=decodeTokenForAdmin(adToken) 
    if(!token_decode) return next(new ErrorHandler('Token Invalid',400)) 
    req.user=token_decode 
    next() 
})

const isAdmin=AsyncError(async(req,res,next)=>{
    if(req.user.email!==process.env.ADMIN_EMAIL){
        return next(new ErrorHandler('Access is only for admin')) 
    }
    next()
})
export {isProtectedAdmin,isAdmin}