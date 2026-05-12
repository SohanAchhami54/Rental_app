import cron from 'node-cron';
import Booking from '../models/booking.model.js'
const deleteExpireBooking=()=>{
 cron.schedule('*/1 * * * *',async () => {
    try {
        const now=new Date() 
        await Booking.deleteMany({returnDate:{$lt:now}})
    } catch (error) {
        console.log('Error occur while deleting expire booking',error)
    }   
});
}
export {deleteExpireBooking}