import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    phone: {
        required: true,
        type: String,
    },
    resetToken: String,
    resetTokenExpiration: Date,
});

export const UserModel = mongoose.model("User", userSchema);
