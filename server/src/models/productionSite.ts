import mongoose, { Schema, Types, model } from "mongoose";

const productionSiteSchema = new Schema({
    id: String,
    name: String,
    description: String,
    company:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
      },
    country: String,
    region: String,
    city: String,
    zipcode: String,
    address: String,
    });

export const ProductionSite = model("ProductionSite", productionSiteSchema);