import fs from 'fs';
import { ErrorHandler } from '../middleware/errorMiddleware.js';
import { AsyncError } from '../utils/Asyncerror.js';
import { bikeAvailability, createBike, deleteB, findBikeByOwner, findBikeData, ownerBikes } from '../services/bike.js';
import { imageUpload, optimizedImage } from '../utils/image.js';
import { findBookingOwner } from '../services/booking.js';
import { updatedImage } from '../services/image.js';

// API to list the bike
const postAddBike =AsyncError(async (req, res) => {

      const { _id } = req.user;
      let bikeData = JSON.parse(req.body.bikeData);
      const imageFile = req.file;
      console.log('imageFile data:',imageFile);

      // Read image and upload to ImageKit
      const fileBuffer = fs.readFileSync(imageFile.path);
      
      const response=await imageUpload({
        file:fileBuffer, 
        fileName:imageFile.originalname, 
        folder:'/bikes'
      })


      const optimizedImageUrl=optimizedImage(response)
  
      await createBike(bikeData,_id,optimizedImageUrl) 
      res.status(200).json({success:true,message:'Bike added'})
    
  });

// API to list all the owner bikes
const getOwnerBikes =AsyncError(async (req, res,next) => {
    const { _id } = req.user;
     const bikes=await ownerBikes({owner:_id})
     if(!bikes) return next(new ErrorHandler('Owner Data not availble',400))
      res.status(200).json({success:true, bikes})
});

// API to toggle bike availability
const toggleBikeAvailability = AsyncError(async (req, res) => {
    const { _id } = req.user;
    const { bikeId } = req.body;
    const bike=await findBikeData(bikeId)
   
    if (bike.owner.toString() !== _id.toString()){
       return next (new ErrorHandler('Unauthorized',400))
    }
     await bikeAvailability(bike)
    
    res.status(200).json({ success: true, message: 'Bike Availability Updated' });
});

// API to delete the bike
const deletebike =AsyncError(async (req, res,next) => {
    const { _id } = req.user;
    const { bikeId } = req.body;

    const bike=await findBikeData(bikeId)
    if(!bike) return next (new ErrorHandler('Bike not found',400))

    if (bike.owner.toString() !== _id.toString()) 
      return next (new ErrorHandler('Unauthorized',400))
    
   const result=await deleteB(bikeId) 
   if (!result) return next(new ErrorHandler('Bike not deleted', 400));

    res.status(200).json({ success: true, message: 'Bike removed' });
});

// API to get the dashboard data
const getDashboardData = AsyncError(async (req, res,next) => {
    const { _id } = req.user;
    const bike =await findBikeByOwner({owner:_id})
   
     
    const booking=await findBookingOwner({owner:_id})
  

    const pendingbooking=booking.filter((b)=>b.status==='pending')
    const completebooking=booking.filter((b)=>b.status==='confirmed')

    const monthlyRevenue=completebooking.reduce((acc,b)=>acc+b.price,0)
   
    const dashboardData = {
      totalbikes: bike.length,
      totalbooking: booking.length,
      pendingbooking: pendingbooking.length,
      completebooking: completebooking.length,
      recentbooking: booking.slice(0, 3),
      monthlyRevenue,
    };

    res.status(200).json({ success: true, dashboardData });
});

// API to update the host profile image
const updateHostImage =AsyncError(async (req, res) => {

    const { _id } = req.user;
    const imageFile = req.file;
    // Read image and upload to ImageKit
    const fileBuffer=fs.readFileSync(imageFile.path)
    const response=await imageUpload({
      file:fileBuffer, 
      fileName:imageFile.originalname, 
      folder:'/hosts'
    })
     const optimizedUrl=optimizedImage(response)
     await updatedImage(_id,optimizedUrl)
     
     res.status(200).json({success:true,message:'Image Updated'})
});

export { postAddBike, getOwnerBikes, toggleBikeAvailability, deletebike, getDashboardData, updateHostImage };
//image ko response aauxa 
// {
//   fileId: "abc123",
//   name: "bike.jpg",
//   url: "https://ik.imagekit.io/yourid/bikes/bike.jpg",
//   filePath: "/bikes/bike.jpg",
//   ...
// }


//  body: {
//     bikeData: `{
//       "brand": "Pulsar",
//       "model": "NS200",
//       "year": 2022,
//       "pricePerDay": 1200,
//       "category": "sport",
//       "transmission": "manual",
//       "fuel_type": "petrol",
//    
//       "location": "Kathmandu",
//       "description": "Well maintained, great for rides."
//     }`
//   },
//   file: {
//     fieldname: 'image',
//     originalname: 'pulsar-ns200.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: 'uploads/',
//     filename: '1689348273478-pulsar-ns200.jpg',
//     path: 'uploads/1689348273478-pulsar-ns200.jpg',
//     size: 152384  // bytes
//   },
//   user: {
//     _id: "6877143ef7aa1ebbde9a205d",
//     firstname: "Sohan",
//     lastname: "Mijar",
//     email: "sohanachhami55@gmail.com",
//     usertype: "host",
//     image: "",
//     createdAt: "2025-07-16T02:53:50.771Z",
//     updatedAt: "2025-07-16T02:53:50.771Z",
//     __v: 0
//   },
//   protocol: "http",
//   secure: false,
//   ip: "::1",
//   cookies: {},
//   signedCookies: {},
//   hostname: "localhost",
//   xhr: false,
//   app: {
//     // internal express app reference
//   },
//   res: {
//     // internal response object reference
//   },
//   route: {
//     path: "/addbike",
//     stack: [/* middlewares and controller */],
//     methods: { post: true }
//   }
// }
