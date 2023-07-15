import { ProductionSite } from "../models/productionSite.js";
import { Request, Response } from "express";

export class ProductionSiteController {
  public getAllProductionSites = async (req: Request, res: Response) => {
    const productionSites = await ProductionSite.find();
    res.json(productionSites);
  };

  public getProductionSiteById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Please provide a ProductionSite id" });
      return;
    }
    const productionSite = await ProductionSite.findById(id);
    if (!productionSite) {
      res.status(404).json({ error: "ProductionSite not found" });
      return;
    }
    res.json(productionSite);
  };

  public addNewProductionSite = async (req: Request, res: Response) => {
    const newProductionSite = new ProductionSite(req.body);
    if (!newProductionSite) {
      res.status(400).json({ error: "Please provide ProductionSite" });
      return;
    } else if (
      newProductionSite.name &&
      newProductionSite.country &&
      newProductionSite.city &&
      newProductionSite.zipcode &&
      newProductionSite.address
    ) {
      await newProductionSite.save();
      console.log(newProductionSite);
      res
        .status(200)
        .json({ message: "New ProductionSite added successfully" });
    } else {
      console.log(newProductionSite);
      res.status(400).json({ error: "Incomplete ProductionSite data" });
    }
  };

  public deleteProductionSite = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Please provide a ProductionSite id" });
      return;
    }
    const deletedProductionSite = await ProductionSite.findByIdAndDelete(id);
    if (deletedProductionSite) {
      res
        .status(200)
        .json({ message: `ProductionSite with id: ${id} has been deleted` });
    } else {
      res.status(404).json({ error: "ProductionSite not found" });
    }
  };

  public updateProductionSite = async (req: Request, res: Response) => {
    const updatedProductionSite = new ProductionSite(req.body);
    const updateProductionSiteId = req.params.id;

    if (!updateProductionSiteId) {
      res.status(400).json({ error: "Please provide a ProductionSite id" });
      return;
    } else if (!updatedProductionSite) {
      res.status(400).json({ error: "Please provide ProductionSite" });
      return;
    }

    await ProductionSite.findByIdAndUpdate(
      updateProductionSiteId,
      updatedProductionSite
    );
    res
      .status(200)
      .json({ message: "ProductionSite has been updated successfully" });
  };
}
