import mongoose, { Schema, Types, model } from "mongoose";

const riskAnalysisSchema = new Schema({
    id: String,
    date: Date,
    numberOfSupplier: String,
    pdfFilePath: String
    });

export const RiskAnalysis = model("RiskAnalysis", riskAnalysisSchema);