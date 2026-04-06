import mongoose from 'mongoose';
const mongoDB=mongoose.connect(`${process.env.MONGODB_URI}`)
export {mongoDB}