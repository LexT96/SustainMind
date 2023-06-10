import mongoose, { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
    name: String,
    });

export const Product = model("Product", productSchema);