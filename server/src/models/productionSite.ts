import mongoose, { Schema, Types, model } from "mongoose";

const productionSiteSchema = new Schema({
  name: String,
  description: String,
  productCategory: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  country: String,
  region: String,
  city: String,
  zipcode: String,
  address: String,
  riskScores: { type: [Schema.Types.ObjectId], ref: "RiskScore" },
});

export const ProductionSite = model("ProductionSite", productionSiteSchema);
