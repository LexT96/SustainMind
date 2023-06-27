import express from "express";
import { SupplierToDoController } from "../controllers/SupplierToDoController.js";

export const supplierToDoRouter = express.Router();
const supplierToDoController = new SupplierToDoController();

supplierToDoRouter.use(express.json());

supplierToDoRouter.get("/", async (req, res) => {
    await supplierToDoController.getAllSupplierToDo(req, res);
});
  
supplierToDoRouter.get("/:id", async (req, res) => {
    await supplierToDoController.getSupplierToDoById(req, res);
});

supplierToDoRouter.post("/", async (req, res) => {
    await supplierToDoController.addNewSupplierToDo(req, res);
});

supplierToDoRouter.put("/:id", async (req, res) => {
    await supplierToDoController.updateSupplierToDo(req, res);
})

supplierToDoRouter.delete("/:id",async (req, res) => {
    await supplierToDoController.deleteSupplierToDo(req, res);
})