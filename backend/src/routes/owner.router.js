import express from 'express';
import { isProtectedUser } from '../middleware/auth.js';
import { postAddBike, getOwnerBikes, toggleBikeAvailability, deletebike, getDashboardData, updateHostImage } from '../controller/owner.controller.js';
import { upload } from '../middleware/multer.js';

const ownerRouter = express.Router();

// ownerRouter.post('/addbike', upload.single('image'), isProtectedUser, postAddBike);
ownerRouter.post('/addbike', isProtectedUser, upload.single('image'), (req, res, next) => {
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);   // 👈 check this
  next();
}, postAddBike);
ownerRouter.get('/bikes', isProtectedUser, getOwnerBikes);
ownerRouter.post('/toggle-bike', isProtectedUser, toggleBikeAvailability);
ownerRouter.post('/delete-bike', isProtectedUser, deletebike);
ownerRouter.get('/dashboard', isProtectedUser, getDashboardData);
ownerRouter.patch('/updateimage',isProtectedUser, upload.single('image'), updateHostImage);

export { ownerRouter };
