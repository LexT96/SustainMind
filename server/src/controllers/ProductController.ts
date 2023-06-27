import { Product } from "../models/product.js";
import { Request, Response } from "express";
export class ProductController {
    public getAllProduct = async (req: Request, res: Response) => {
        const Products = await Product.find();
        res.send(Products);
    }
    public getProductById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a Product id");
            return;
        }
        const product = await Product.findById(id);
        if (!Product) {
            res.status(404).send("Product not found");
            return;
        }
        res.send(Product);
    }
    public addNewProduct = async (req: Request, res: Response) => {
        const newProduct = new Product(req.params);
        if (!newProduct) {
            res.status(400).send("Please provide Product");
            return;
        }
        await newProduct.save();
        }
    public deleteProduct = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a Product id");
            return;
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct) {
            res.status(200).send(`Product with id: ${id} has been deleted`);
        }
    }
    public updateProduct = async (req: Request, res: Response) => {
        const updatedProduct = new Product(req.params);
        const updatedProductId = req.params.id;

        if (!updatedProductId) {
            res.status(400).send("Please provide a Product id");
            return;
        } else if (!updatedProduct) {
            res.status(400).send("Please provide Product");
            return;
        }
        await Product.findByIdAndUpdate(updatedProductId, updatedProduct);
        res.status(200).send("Product has been updated succesfully");
    }
}