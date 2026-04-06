import express from 'express';
import { createBooking, getOwnerBookings, changeBookingStatus, allowpayment } from '../controller/booking.controller.js';
import { isProtectedUser } from '../middleware/auth.js';

const bookingRouter = express.Router();

bookingRouter.post('/create', isProtectedUser, createBooking);
bookingRouter.get('/owner', isProtectedUser, getOwnerBookings);
bookingRouter.post('/change-status', isProtectedUser, changeBookingStatus);
bookingRouter.post('/allowpayment', isProtectedUser, allowpayment);

export { bookingRouter };