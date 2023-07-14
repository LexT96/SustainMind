import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectToDatabase } from "../conn.js";
import { seedRiskTypes } from "./RiskTypeSeeder.js";
import { seedProductCategories } from "./ProductCategories.js";
import { seedProducts } from "./ProductSeeder.js";
import { seedCustomers } from "./CustomerSeeder.js";
import { seedProductionSites } from "./ProductionSiteSeeder.js";
import { seedRiskScores } from "./RiskScoreSeeder.js";
import { seedIsSuppliers } from "./IsSupplierSeeder.js";

export const seedAll = async () => {
  console.log("connecting to database...");
  try {
    await connectToDatabase();
    await seedRiskTypes();
    await seedProductCategories();
    await seedProducts();
    await seedCustomers();
    await seedProductionSites()
    await seedRiskScores();
    await seedIsSuppliers();
    console.log("DONE!");
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

seedAll();