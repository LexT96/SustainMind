import * as dotenv from "dotenv";

dotenv.config();

export const dbConnectionString = process.env.DB_CONN_STRING || "";
export const host = process.env.HOST || "localhost";
export const port = process.env.PORT || 3010;