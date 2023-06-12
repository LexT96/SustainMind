import mongoose, { Schema, Types, model } from "mongoose";

const supplierToDoSchema = new Schema({
    id: String,
    company: String,
    supplier: String,
    toDo: String,
    Deadline: Date,
    status: String,
    result: String,
    });

export const SupplierToDo = model("SupplierToDo", supplierToDoSchema);