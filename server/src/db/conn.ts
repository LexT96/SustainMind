import { dbConnectionString } from "../config.js";
import mongoose from "mongoose";

export async function connectToDatabase () {
    return await mongoose.connect(dbConnectionString);
}