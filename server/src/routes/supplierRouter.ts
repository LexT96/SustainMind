import express from "express";
import { SupplierController } from "../controllers/SupplierController.js";

export const supplierRouter = express.Router();
const supplierController = new SupplierController();

supplierRouter.use(express.json());

supplierRouter.get("/", async (req, res) => {
  await supplierController.getAllSupplier(req, res);
});

supplierRouter.get("/:id", async (req, res) => {
  await supplierController.getSupplierById(req, res);
});

supplierRouter.post("/", async (req, res) => {
  await supplierController.addNewSupplier(req, res);
});

supplierRouter.put("/:id", async (req, res) => {
  await supplierController.updateSupplier(req, res);
});

supplierRouter.delete("/:id", async (req, res) => {
  await supplierController.deleteSupplier(req, res);
});

supplierRouter.get(
  "/:id/negotiationPowerWithOwnContractVolume",
  async (req, res) => {
    await supplierController.calculateNegotiationPowerWithOwnContractVolume(
      req,
      res
    );
  }
);

supplierRouter.get(
  "/:id/negotiationPowerWithTotalContractVolume",
  async (req, res) => {
    await supplierController.calculateNegotiationPowerWithTotalContractVolume(
      req,
      res
    );
  }
);
