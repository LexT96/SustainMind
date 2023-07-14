import { Customer } from "../../models/customer.js";
import { IsSupplier } from "../../models/isSupplier.js";
const TUM_COMPANY_ID = "6499c51b722353f7b1585069";

export const seedIsSuppliers = async () => {
  console.log("seeding IsSuppliers...");
  const customers = await Customer.find({});
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