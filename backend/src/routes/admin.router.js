import express from 'express' 
import { adminLogin, userDataforAdmin } from '../controller/admin.controller.js'
import { isAdmin, isProtectedAdmin } from '../middleware/auth.admin.js'
const adminRouter=express.Router() 

adminRouter.get('/getuserdata',isProtectedAdmin,isAdmin,userDataforAdmin)
adminRouter.post('/login',adminLogin)
export {adminRouter}