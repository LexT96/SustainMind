import { ProductCategory } from "../models/productCategory.js";
import { Request, Response } from "express";
export class ProductCategoryController {
    public getAllProductCategory = async (req: Request, res: Response) => {
        const ProductCategories = await ProductCategory.find();
        res.json(ProductCategories);
    }
    public getProductCategoryById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).json("Please provide a ProductCategory id");
            return;
        }
        const productCategory = await ProductCategory.findById(id);
        if (!ProductCategory) {
            res.status(404).json("ProductCategory not found");
            return;
        }
        res.json(ProductCategory);
    }
    public addNewProductCategory = async (req: Request, res: Response) => {
        const newProductCategory = new ProductCategory(req.params);
        if (!newProductCategory) {
            res.status(400).json("Please provide ProductCategory");
            return;
        }
        await newProductCategory.save();
        }
    public deleteProductCategory = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).json("Please provide a ProductCategory id");
            return;
        }
        const deletedProductCategory = await ProductCategory.findByIdAndDelete(id);
        if (deletedProductCategory) {
            res.status(200).json(`ProductCategory with id: ${id} has been deleted`);
        }
    }
    public updateProductCategory = async (req: Request, res: Response) => {
        const updatedProductCategory = new ProductCategory(req.params);
        const updatedProductCategoryId = req.params.id;

        if (!updatedProductCategoryId) {
            res.status(400).json("Please provide a ProductCategory id");
            return;
        } else if (!updatedProductCategory) {
            res.status(400).json("Please provide ProductCategory");
            return;
        }
        await ProductCategory.findByIdAndUpdate(updatedProductCategoryId, updatedProductCategory);
        res.status(200).json("ProductCategory has been updated succesfully");
    }
}