import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const encryptedPassword=async(password)=>{
        const salt=await bcrypt.genSalt(10)
         const hashedPassword= await bcrypt.hash(password,salt)
         return hashedPassword
}

const comparePassword=async(password,dbpassword)=>{
      return await bcrypt.compare(password,dbpassword)
}

const generateToken=(user)=>{
  const token=jwt.sign(
    {
        id:user._id.toString()
    },
    process.env.JWT_SECRET,{
      expiresIn:'1h'
    }
  )
  return token
}

const verifyToken=(token)=>{
     const decode= jwt.verify(token,process.env.JWT_SECRET)
     return decode
}

export {encryptedPassword,comparePassword,generateToken,verifyToken}
