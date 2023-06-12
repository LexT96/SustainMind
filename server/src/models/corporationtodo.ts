import mongoose, { Schema, Types, model } from "mongoose";

const corporationtoDoSchema = new Schema({
    id: String,
    company: String,
    supplier: String,
    toDo: String,
    Deadline: Date,
    status: String,
    result: String,
    });

export const CorporationToDo = model("CorporationToDo", corporationtoDoSchema);