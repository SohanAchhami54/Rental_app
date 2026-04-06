import { useEffect, useState } from "react";
import Title from "../components/Title";
import { useAppcontext } from "../context/AppContext";


import { Button } from "../shadcnui/button";
import {useNavigate} from 'react-router';
import { getUserBookings } from "../services/managebooking";

const MyBooking = () => {
  const {user, currency } = useAppcontext();
  const [bookings, setBookings] = useState([]);
  const [now, setNow] = useState(new Date());
  const navigate=useNavigate();

  const fetchMyBookings = async () => {
    await getUserBookings(setBookings)
  };

  useEffect(() => { 
    if (user) fetchMyBookings(); 
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

    const formatRemainingTime = (returnDate) => {
      const diff = new Date(returnDate) - now;
      if (diff <= 0) return "Expired";
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl min-h-screen">
      <Title title="My Bookings" subTitle="View and manage all your vehicle bookings" />

      <ul>
        {bookings.map((booking, index) => (
          <li key={booking._id} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-lg border border-gray-400 mt-5">
            
            {/* Bike Info */}
            <div>
              <img src={booking.bike.image} alt="booking bike" className="w-full h-auto aspect-video object-cover" />
              <p className="text-lg font-medium mt-2">{booking.bike.brand} {booking.bike.model}</p>
              <p className="text-gray-500">{booking.bike.year}.{booking.bike.category}.{booking.bike.location}</p>
            </div>

            {/* Booking Info */}
            <div>
              <div className="flex items-center gap-2">
                <p className="px-3 py-1.5 bg-light rounded">Booking #{index + 1}</p>
                <p className={`px-2 py-1 text-sm rounded-full ${booking.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {booking.status}
                </p>
              </div>

              <div className="flex items-start gap-2 mt-2">
                <div>
                  <p className="text-gray-500">Rental Period</p>
                  <p>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-2">
                <div>
                  <p className="text-gray-500">Pickup Location</p>
                  <p>{booking.bike.location}</p>
                </div>
              </div>
            </div>

            {/* Time Remaining & Payment */}
            <div className="flex flex-col mx-auto">
              <div>
                <p className="text-gray-500 text-sm md:text-lg">Time Remaining</p>
                {booking.status === 'confirmed' ? (
                  <p>{formatRemainingTime(booking.returnDate)}</p>
                ) :booking.status==="cancelled"?(
                <p className="text-gray-500">Your booking is Cancelled</p>)
                : (
                  <p className="text-gray-500">Waiting for payment</p>
                )}
              </div>

              {booking.status === 'pending' && booking.paymentAllowed&&(
                <div className="mt-2">
                  <Button 
                   onClick={()=>navigate('/payment',{state:{total_amount:booking.price,bookingId:booking._id}})}
                   className="bg-green-500 rounded-lg font-medium"
                   >
                  Pay via eSewa
                  </Button>
                </div>
              )}
            </div>

            {/* Price Info */}
            <div className="flex flex-col justify-between">
              <div className="space-y-2 text-sm text-gray-500 text-right">
                <p>Total Price</p>
                <h1 className="text-2xl font-bold text-blue-700">{currency} {booking.price}</h1>
                <p>Booked on {booking.createdAt.split('T')[0]}</p>
              </div>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBooking;
