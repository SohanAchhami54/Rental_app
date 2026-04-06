import Booking from '../models/booking.model.js';
import purchasedBikes from '../models/purchasebike.model.js';
import payment from '../models/payment.model.js';
import 'dotenv/config';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from '../utils/mailer.js';
import { AsyncError } from '../utils/Asyncerror.js';
import { deleteBooking, findMybooking } from '../services/booking.js';

// Payment success handler
const paymentsuccess = AsyncError(async (req, res) => {
  try {
    const { bookingId, transactionCode, total_amount, status } = req.body;
    console.log("bookingId:", bookingId, "status:", status);

    const booking = await Booking.findById(bookingId)
      .populate('user')
      .populate('bike')
      .populate('owner');

    if (!booking) return res.json({ success: false, message: "Booking not found" });

    const normalized = status?.toLowerCase();

    if (normalized === "completed" || normalized === "complete" || normalized === "success") {
      booking.payment.pricestatus = "paid";
      booking.status = "confirmed";
      booking.payment.transactionCode = transactionCode;

      // Create purchased bike record in database
      await purchasedBikes.create({
        booking: booking._id,
        bike: booking.bike._id,
        user: booking.user._id,
        owner: booking.owner._id,
        price: booking.price,
        pickupDate: booking.pickupDate,
        returnDate: booking.returnDate,
      });

      // Create payment record in database
      await payment.create({
        booking: booking._id,
        user: booking.user._id,
        amount: total_amount,
        status: "paid",
        transactionCode,
        method: "eSewa",
      });

      const emailContent = `
        <h2>Payment Successful</h2>
        <p>Hello ${booking.user.firstname} ${booking.user.lastname},</p>
        <p>Thank you for booking with us. Here are your details:</p>
        <ul>
          <li><b>Bike:</b> ${booking.bike.model}</li>
          <li><b>Price:</b> NPR ${booking.price}</li>
          <li><b>Image:</b> ${booking.bike.image}</li>
          <li><b>Pickup Date:</b> ${new Date(booking.pickupDate).toDateString()}</li>
          <li><b>Return Date:</b> ${new Date(booking.returnDate).toDateString()}</li>
          <li><b>Transaction Code:</b> ${transactionCode}</li>
          <li><b>Status:</b> ${status}</li>
        </ul>
        <p>Ride safe!</p>
      `;

      await sendMail(booking.user.email, "Bike Booking Payment Success", emailContent);

    } else {
      booking.payment.pricestatus = "failed";

      await payment.create({
        booking: booking._id,
        user: booking.user._id,
        amount: total_amount,
        status: "failed",
        transactionCode,
        method: "eSewa",
      });
    }

    await booking.save();
    res.json({ success: true, message: "Payment recorded", booking });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Get all bookings for the logged-in user
const getUserBookings =AsyncError(async (req, res) => {
    console.log('userbookings', req.user);
    const { _id } = req.user;

    // Delete expired bookings
    await deleteBooking({user:_id})
    const bookings= await findMybooking({user:_id})
   
    const availableBookings = bookings.filter(b =>
      b.bike &&
      b.bike.isAvailable &&
      new Date(b.returnDate) > new Date()
    );

    return res.status(200).json({ success: true, bookings: availableBookings });
  });

export { paymentsuccess, getUserBookings };

