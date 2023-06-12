import express from "express";
import { CustomerController } from "../controllers/CustomerController.js";

export const customerRouter = express.Router();
const customerController = new CustomerController();

customerRouter.use(express.json());

customerRouter.get("/", async (req, res) => {
    await customerController.getAllCustomer(req, res);
});
  
customerRouter.get("/:id", async (req, res) => {
    await customerController.getCustomerById(req, res);
});

customerRouter.post("/", async (req, res) => {
    await customerController.addNewCustomer(req, res);
});

customerRouter.put("/:id", async (req, res) => {
    await customerController.updateCustomer(req, res);
})

customerRouter.delete("/:id",async (req, res) => {
    await customerController.deleteCustomer(req, res);
})