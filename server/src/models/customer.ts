import mongoose, { Schema, Types, model } from "mongoose";

const customerSchema = new Schema({
    id: String,
    companyName: String,
    country: String,
    region: String,
    city: String,
    zipcode: String,
    address: String,
    contactPersonLastName: String,
    contactPersonFirstName: String,
    contactPersonEmail: String,
    accountType: String,
    revenue: String
    });

export const Customer = model("Customer", customerSchema);