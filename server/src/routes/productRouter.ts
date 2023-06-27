import express from "express";
import { ProductController } from "../controllers/ProductController.js";

export const productRouter = express.Router();
const productController = new ProductController();

productRouter.use(express.json());

productRouter.get("/", async (req, res) => {
    await productController.getAllProduct(req, res);
});
  
productRouter.get("/:id", async (req, res) => {
    await productController.getProductById(req, res);
});

productRouter.post("/", async (req, res) => {
    await productController.addNewProduct(req, res);
});

productRouter.put("/:id", async (req, res) => {
    await productController.updateProduct(req, res);
})

productRouter.delete("/:id",async (req, res) => {
    await productController.deleteProduct(req, res);
})