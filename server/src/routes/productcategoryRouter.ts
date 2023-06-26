import express from "express";
import { ProductCategoryController } from "../controllers/ProductCategoryController.js";

export const productCategoryRouter = express.Router();
const productCategoryController = new ProductCategoryController();

productCategoryRouter.use(express.json());

productCategoryRouter.get("/", async (req, res) => {
    await productCategoryController.getAllProductCategory(req, res);
});
  
productCategoryRouter.get("/:id", async (req, res) => {
    await productCategoryController.getProductCategoryById(req, res);
});

productCategoryRouter.post("/", async (req, res) => {
    await productCategoryController.addNewProductCategory(req, res);
});

productCategoryRouter.put("/:id", async (req, res) => {
    await productCategoryController.updateProductCategory(req, res);
})

productCategoryRouter.delete("/:id",async (req, res) => {
    await productCategoryController.deleteProductCategory(req, res);
})