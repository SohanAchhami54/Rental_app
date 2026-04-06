import User from "../models/user.model.js"

const updatedImage=async(_id,optimizedUrl)=>{
    try{
         await User.findByIdAndUpdate(_id,{image:optimizedUrl})
    }catch(error){
        console.log('Error occured:',error)
    }
  
}

export {updatedImage}