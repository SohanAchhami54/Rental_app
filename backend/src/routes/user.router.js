import express from 'express';
import { isProtectedUser} from '../middleware/auth.js';
import { getUserBookings, paymentsuccess } from '../controller/user.controller.js';

const guestbookingRouter = express.Router();

guestbookingRouter.get('/user', isProtectedUser, getUserBookings);
guestbookingRouter.post('/payment-success', isProtectedUser, paymentsuccess);

export { guestbookingRouter };