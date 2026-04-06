import dotenv from 'dotenv';
dotenv.config(); 

// Now import everything else BELOW
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import { authRouter } from './routes/auth.router.js';
import { ownerRouter } from './routes/owner.router.js';
import { bookingRouter } from './routes/booking.router.js';
import { guestbookingRouter } from './routes/user.router.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { mongoDB } from './config/db.js';

const app = express();

// Middleware
app.use(express.json());
let corsheaders={
  origin:'http://localhost:5174',
  methods:['GET','POST','PUT','DELETE','PATCH'],
  credentials:true
}
app.use(cors(corsheaders));
app.use(cookieParser());
// Log every request
app.use((req, res, next) => {
  console.log('Url:' + req.url + ' Method:' + req.method);
  next();
});

// Routes
app.use('/api/user', authRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/guestbooking', guestbookingRouter);
const PORT=`${process.env.PORT}`
mongoDB
    .then(()=>{
      console.log('Mongo is connected')
       app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
    })
    .catch((err)=>{
      console.log('Error occured:',err)
    })
  app.use(errorMiddleware)