import mongoose, { Schema, Types, model } from "mongoose";

const riskTypeSchema = new Schema({
  name: { type: String },
  description: { type: String }
});

export const RiskType = model("RiskType", riskTypeSchema);