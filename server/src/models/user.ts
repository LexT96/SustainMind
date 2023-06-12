import mongoose, { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    }
    });

export const User = model("User", userSchema);