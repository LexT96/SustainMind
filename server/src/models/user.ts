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

const productSchema = new Schema({
    name: String,
    user: userSchema

    });

export const User = model("User", userSchema);
export const Product = model("Product", productSchema);