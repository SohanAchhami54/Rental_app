// authentication middleware in ES module format
import { ErrorHandler } from './errorMiddleware.js';
import { verifyToken } from '../utils/auth.js';
import { getUserDetails } from '../services/auth.js';
import { AsyncError } from '../utils/Asyncerror.js';

const isProtectedUser=AsyncError(async(req,res,next)=>{
    const {userToken}=req.cookies 
    if(!userToken) return next (new ErrorHandler('Token not found',400))
   
   const token_decode=verifyToken(userToken)
   if(!token_decode) return next(new ErrorHandler('Token is incorrect',400))
    const user=await getUserDetails(token_decode.id) //to get the user details.
    console.log('userdata',user)
    req.user=user
    next()
})

export {isProtectedUser}







//  const protect = async (req, res, next) => {
//     // console.log(req.headers); // authorization key aauxa, extra keys pani aauxa
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.json({ success: false, message: 'Not authorized' });
//     }

//     try {
//         // decode the token to get user ID
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); 
//         const userId = decoded?.id;

//         if (!userId) {
//             return res.json({ success: false, message: 'Not authorized' });
//         }

//         req.user = await User.findById(userId).select('-password');
//         next();
//     } catch (error) {
//         return res.json({ success: false, message: 'Not authorized' });
//     }
// };
// export {protect}