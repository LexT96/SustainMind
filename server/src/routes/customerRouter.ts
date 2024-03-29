import express from "express";
import { CustomerController } from "../controllers/CustomerController.js";

export const customerRouter = express.Router();
const customerController = new CustomerController();

customerRouter.use(express.json());

customerRouter.get("/", customerController.getAllCustomer);

customerRouter.get(
  "/marketplace",
  customerController.getCustomersForMarketplace
);

customerRouter.get("/:id", customerController.getCustomerById);

customerRouter.post("/", customerController.addNewCustomer);

customerRouter.put("/:id", async (req, res) => {
  await customerController.updateCustomer(req, res);
});

customerRouter.delete("/:id", async (req, res) => {
  await customerController.deleteCustomer(req, res);
});

customerRouter.get("/:id/suppliers", customerController.getSuppliersOfCustomer);

customerRouter.get(
  "/:id/productionSites",
  customerController.getAllProductSitesOfSupplier
);

customerRouter.post(
  "/:id/risk-analysis",
  customerController.createNewRiskAnalysis
);
