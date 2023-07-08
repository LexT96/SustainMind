import { ProductCategory } from "../models/productCategory.js";
import { Request, Response } from "express";

export class ProductCategoryController {
  public getAllProductCategory = async (req: Request, res: Response) => {
    try {
      const productCategories = await ProductCategory.find();
      res.json(productCategories);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public getProductCategoryById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ error: "Please provide a ProductCategory id" });
        return;
      }
      const productCategory = await ProductCategory.findById(id);
      if (!productCategory) {
        res.status(404).json({ error: "ProductCategory not found" });
        return;
      }
      res.json(productCategory);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public addNewProductCategory = async (req: Request, res: Response) => {
    try {
      const newProductCategory = new ProductCategory(req.body);
      if (!newProductCategory) {
        res.status(400).json({ error: "Please provide ProductCategory" });
        return;
      }
      await newProductCategory.save();
      res.json(newProductCategory);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public deleteProductCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ error: "Please provide a ProductCategory id" });
        return;
      }
      const deletedProductCategory = await ProductCategory.findByIdAndDelete(id);
      if (deletedProductCategory) {
        res.status(200).json(`ProductCategory with id: ${id} has been deleted`);
      } else {
        res.status(404).json({ error: "ProductCategory not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public updateProductCategory = async (req: Request, res: Response) => {
    try {
      const updatedProductCategoryId = req.params.id;
      if (!updatedProductCategoryId) {
        res.status(400).json({ error: "Please provide a ProductCategory id" });
        return;
      }

      const updatedProductCategory = req.body;
      if (!updatedProductCategory) {
        res.status(400).json({ error: "Please provide ProductCategory" });
        return;
      }

      await ProductCategory.findByIdAndUpdate(updatedProductCategoryId, updatedProductCategory);
      res.status(200).json("ProductCategory has been updated successfully");
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
