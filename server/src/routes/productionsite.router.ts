import express from "express";
import { ProductionSiteController } from "../controllers/ProductionSiteController.js";

export const productionSiteRouter = express.Router();
const productionSiteController = new ProductionSiteController();

productionSiteRouter.use(express.json());

productionSiteRouter.get("/", async (req, res) => {
    return await productionSiteController.getAllProductionSites(req, res);
});
  
productionSiteRouter.get("/:id", async (req, res) => {
    await productionSiteController.getProductionSiteById(req, res);
});

productionSiteRouter.post("/", async (req, res) => {
    await productionSiteController.addNewProductionSite(req, res);
});

productionSiteRouter.put("/:id", async (req, res) => {
    await productionSiteController.updateProductionSite(req, res);
})

productionSiteRouter.delete("/:id",async (req, res) => {
    await productionSiteController.deleteProductionSite(req, res);
})