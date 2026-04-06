import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const paymentSchema = new mongoose.Schema({
    booking: { type: ObjectId, ref: "Booking", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["paid", "unpaid", "failed"], default: "unpaid" },
    transactionCode: { type: String },
    method: { type: String, default: "eSewa" },
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);