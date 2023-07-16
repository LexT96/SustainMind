import { ObjectId } from "mongodb";
import { Customer } from "../../models/customer.js";
import { IsSupplier } from "../../models/isSupplier.js";
const TUM_COMPANY_ID = "6499c51b722353f7b1585069";

export const seedIsSuppliers = async () => {
  console.log("seeding IsSuppliers...");
  const customers = await Customer.find({"_id": { "$in": [new ObjectId("9f85d32a129040f9b2509798"), new ObjectId("7a26d68b1230b1e9b6543210"), new ObjectId("8853d75a927858f9c3409059")]}})
  return await Promise.all(
    customers.map(async (c) => {
      if (c._id.toString() === TUM_COMPANY_ID) {
        return;
      }
      const isSupplier = await IsSupplier.create({
        idCorporation: TUM_COMPANY_ID,
        idSupplier: c._id,
        contractVolume: Math.floor(Math.random() * 1000000),
      });
      return isSupplier;
    })
  );
}