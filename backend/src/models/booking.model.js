import mongoose from 'mongoose';
const { Schema, Types } = mongoose;
const { ObjectId } = Schema.Types;

const bookingSchema = new Schema({
    bike: {
        type: ObjectId,
        ref: 'Bike',
        required: true // storing the unique ID of the document
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true,
    },
    priorityScore: {
        type: Number,
        required: true
    },
    paymentAllowed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending' // default status
    },
    price: {
        type: Number,
        required: true,
    },
    payment: {
        pricestatus: { type: String, default: "unpaid" }, // unpaid / paid / failed
        transactionCode: { type: String },
        method: { type: String, default: "eSewa" }, // online / esewa
    }
}, { timestamps: true });

// optional TTL index (delete doc when returnDate passes)
bookingSchema.index({ returnDate: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Booking', bookingSchema);