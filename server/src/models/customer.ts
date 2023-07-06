import mongoose, { Schema, Types, model } from "mongoose";

const customerSchema = new Schema({
  companyName: String,
  country: String,
  region: String,
  city: String,
  zipcode: String,
  address: String,
  contactPersonName: String,
  contactPersonEmail: String,
  accountType: String,
  numberOfEmployees: Number,
  revenue: String,
  showOnMarketplace: { type: Boolean },
  image: String,
  description: String,
  productionSites: {
    ref: "ProductionSite",
    type: [Types.ObjectId],
  },
  productCategories: {
    ref: "ProductCategory",
    type: [Types.ObjectId],
  },
});

export const Customer = model("Customer", customerSchema);