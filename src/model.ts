import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    uid: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: Buffer
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    }
})

export const UserModel = mongoose.model('User', userSchema)