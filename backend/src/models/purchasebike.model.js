import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const purchaseBikesSchema = new mongoose.Schema({
    booking: { type: ObjectId, ref: "Booking", required: true },
    bike: { type: ObjectId, ref: "Bike", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    owner: { type: ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
}, { timestamps: true });
 purchaseBikesSchema.index(
  { returnDate: 1 },
  { expireAfterSeconds: 0 }
);
export default mongoose.model("PurchaseBikes", purchaseBikesSchema);