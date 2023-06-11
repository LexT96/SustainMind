import mongoose, { Schema, Types, model } from "mongoose";

const productCategorySchema = new Schema({
    name: String,
    });

export const ProductCategory = model("ProductCategory", productCategorySchema);