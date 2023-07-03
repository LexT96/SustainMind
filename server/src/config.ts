import * as dotenv from "dotenv";

dotenv.config();

export const dbConnectionString = process.env.DB_CONN_STRING || "mongodb+srv://unihaci:Sustainmind@sustainmind.i3um0wi.mongodb.net/";
export const host = process.env.HOST || "localhost";
export const port = process.env.PORT || 3010;