import { ProductionSite } from "../models/productionSite";
import { Request, Response } from "express";
export class ProductionSiteController {
    public getAllProductionSites = async (req: Request, res: Response) => {
        const productionSites = await ProductionSite.find();
        res.send(productionSites);
    }
    public getAllProductSitesOfSupplier = async (req: Request, res: Response) => {
        const supplierName = req.params.supplierName;
        const productionSites = await ProductionSite.find({ company: supplierName });
        res.send(productionSites);
      }
    public getProductionSiteById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a ProductionSite id");
            return;
        }
        const productionSite = await ProductionSite.findById(id);
        if (!ProductionSite) {
            res.status(404).send("ProductionSite not found");
            return;
        }
        res.send(ProductionSite);
    }

    public addNewProductionSite = async (req: Request, res: Response) => {
        const newProductionSite = new ProductionSite(req.params);
        if (!newProductionSite) {
            res.status(400).send("Please provide ProductionSite");
            return;
        } else if (
            // newProductionSite.id &&
            newProductionSite.name &&
            // newProductionSite.description &&
            newProductionSite.company &&
            newProductionSite.country &&
            // newProductionSite.region &&
            newProductionSite.city &&
            newProductionSite.zipcode &&
            newProductionSite.address
          ) {
            await newProductionSite.save();
          } 
        }

    public deleteProductionSite = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a ProductionSite id");
            return;
        }
        const deletedProductionSite = await ProductionSite.findByIdAndDelete(id);
        if (deletedProductionSite) {
            res.status(200).send(`ProductionSite with id: ${id} has been deleted`);
        }
    }
    public updateProductionSite = async (req: Request, res: Response) => {
        const updatedProductionSite = new ProductionSite(req.params);
        const updateProductionSiteId = req.params.id;

        if (!updateProductionSiteId) {
            res.status(400).send("Please provide a ProductionSite id");
            return;
        } else if (!updatedProductionSite) {
            res.status(400).send("Please provide ProductionSite");
            return;
        }
        await ProductionSite.findByIdAndUpdate(updateProductionSiteId, updatedProductionSite);
        res.status(200).send("ProductionSite has been updated succesfully");
    }
}