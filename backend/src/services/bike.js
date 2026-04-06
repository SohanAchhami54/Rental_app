import Bike from '../models/bike.model.js';
const  findBike=async()=>{
    try {
        const bike=await Bike.find({isAvailable:true})
        return bike
    }catch(error){
        console.log('Error Occured:',error)
    }
}

const findBikeData=async(bikeid)=>{
    try{
       const bikeData=await Bike.findById(bikeid)
       return bikeData
    }catch(error){
       console.log('Error occured',error)
    }
}

const ownerBikes=async({owner})=>{
    try{
       const bikeData=await Bike.find({owner})
       return bikeData
    }catch(error){
       console.log('Error occured:',error)
    }
} 

const bikeAvailability=async(bike)=>{
   bike.isAvailable=!bike.isAvailable 
   await bike.save()
}

const deleteB=async(bikeId)=>{
   try {
    const result= await Bike.findByIdAndDelete(bikeId);
    return result
   }catch(error){
    console.log('Error occured:',error)
   }
}

const createBike=async(bikeData,_id,optimizedImageUrl)=>{
   await Bike.create({...bikeData,owner:_id,image:optimizedImageUrl})
}


const findBikeByOwner=async({owner})=>{
  try{
   const bike = await Bike.find({owner})
   return bike
  }catch(error){
   console.log('Error occured:',error)
  }
}

export {findBike,findBikeData,ownerBikes,bikeAvailability,deleteB,createBike,findBikeByOwner}