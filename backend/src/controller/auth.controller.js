import { ErrorHandler } from '../middleware/errorMiddleware.js';
import { createUser, findUserEmail } from '../services/auth.js';
import { AsyncError } from '../utils/Asyncerror.js';
import { comparePassword, generateToken } from '../utils/auth.js';
import { findBike } from '../services/bike.js';

// User signup 
const PostSignUp=AsyncError(async (req,res,next)=>{
    const {firstname,lastname,usertype,address,email,password}=req.body
    if(!firstname || !lastname  || !usertype || !address || !email || !password) {
        return next(new ErrorHandler('All field must be required',400))
    }
    const userExists=await findUserEmail(email)
    if(userExists) return next(new ErrorHandler('User with this email already exists',400))
   
   const user=await createUser({firstname,lastname,usertype,address,email,password})
   return res.status(200).json({success:true,data:user})
})

// User login
const postloginuser=AsyncError(async(req,res,next)=>{
     const {email,password}=req.body 
     if(!email || !password) return next(new ErrorHandler('All field must be required',400))
     
     const user=await findUserEmail(email)
       if(!user) return next(new ErrorHandler('User with this email does not exists',400))
    
     const passwordMatch=await comparePassword(password,user.password)
     if(!passwordMatch) return next(new ErrorHandler('Password do not match',400))
    
     const jwtToken= generateToken(user)
     console.log('jwttoken', jwtToken)
     res.cookie('userToken',jwtToken,{
       httpOnly:true, 
       secure:false, 
       maxAge:24*60*60*1000, 
       sameSite:'lax'
     })
    return res.status(200).json({success:true,data:jwtToken})
})

// Get user data using JWT token
 const getUserData =AsyncError(async (req, res) => {
    const {user}=req
    res.status(200).json({success:true,user})
});

// Get all available bikes
 const getBikes = async (req, res) => {
    const bikes =await findBike()
    return res.status(200).json({success:true,bikes})
};

export {getBikes, getUserData, postloginuser,PostSignUp}

