import express from 'express' 
import { adminLogin, ownerBikeforAdmin, ownerDataforAdmin, purchaseBikeForAdmin, toggleBikeForAdmin, userBookingForAdmin, userDataforAdmin } from '../controller/admin.controller.js'
import { isAdmin, isProtectedAdmin } from '../middleware/auth.admin.js'
const adminRouter=express.Router() 

adminRouter.get('/getuserdata',isProtectedAdmin,isAdmin,userDataforAdmin) 
adminRouter.get('/getownerdata',isProtectedAdmin,isAdmin,ownerDataforAdmin)
adminRouter.get('/getownerbike',isProtectedAdmin,isAdmin,ownerBikeforAdmin)
adminRouter.patch('/togglebikeavailable',isProtectedAdmin,isAdmin,toggleBikeForAdmin)
adminRouter.get('/purchasebike',isProtectedAdmin,isAdmin,purchaseBikeForAdmin)
adminRouter.get('/userbookingdata',isProtectedAdmin,isAdmin,userBookingForAdmin)
adminRouter.post('/login',adminLogin)
export {adminRouter}
