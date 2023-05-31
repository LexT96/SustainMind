import mongoose, { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
})

module.exports = mongoose.model

export const User = model("User", userSchema);