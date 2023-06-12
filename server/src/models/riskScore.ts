import mongoose, { Schema, model } from "mongoose";

const riskScoreSchema = new Schema({
  id: String,
  productionSite: { type: Schema.Types.ObjectId, ref: "ProductionSite" },
  riskType: { type: Schema.Types.ObjectId, ref: "RiskType" },
  riskScore: String,
  priority: String,
});

export const RiskScore = model("RiskScore", riskScoreSchema);
