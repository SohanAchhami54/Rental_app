import User from '../models/user.model.js'
import { encryptedPassword } from "../utils/auth.js"

const findUserEmail=async(email)=>{
    try{
       const user= await User.findOne({email})
       return user
    }catch(error){
        console.log('Error has occured:',error)
    }  
}

const createUser=async(userData)=>{
    try{
      const user=(await (User.create({...userData,password:await encryptedPassword(userData.password)}))).toJSON()
      const {password,...userwithoutpass}=user
      return userwithoutpass
    }catch(error){
     console.log('Error has occured:',error)
    }
}

const getUserDetails=async(id)=>{
   try{
     const user=await User.findById(id).select('-password')
     return user
   }catch(error){
      console.log('Error Occured:',error)
   }
}


export {findUserEmail,createUser,getUserDetails}