import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname is required']
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required']
    },
    usertype: {
        type: String,
        enum: ['guest', 'host'],
        default: 'guest',
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    image: {
        type: String,
        default: '',
    }
}, { timestamps: true }); // createdAt and updatedAt automatically

export default mongoose.model('User', userSchema);