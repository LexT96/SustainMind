import mongoose, { Schema, Types, model } from "mongoose";

const riskTypeSchema = new Schema({
    name: String,
    description: String,
    });

export const RiskType = model("RiskType", riskTypeSchema);