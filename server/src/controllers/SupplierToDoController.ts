import { SupplierToDo } from "../models/suppliertodo.js";
import { Request, Response } from "express";
export class SupplierToDoController {
    public getAllSupplierToDo = async (req: Request, res: Response) => {
        const SupplierToDos = await SupplierToDo.find();
        res.send(SupplierToDos);
    }
    public getSupplierToDoById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a SupplierToDo id");
            return;
        }
        const supplierToDo = await SupplierToDo.findById(id);
        if (!SupplierToDo) {
            res.status(404).send("SupplierToDo not found");
            return;
        }
        res.send(supplierToDo);
    }
    public addNewSupplierToDo = async (req: Request, res: Response) => {
        const newSupplierToDo = new SupplierToDo(req.params);
        if (!newSupplierToDo) {
            res.status(400).send("Please provide SupplierToDo");
            return;
        }
            await newSupplierToDo.save();
            res.status(200).send('SupplierToDo has been added')
        
        }
    public deleteSupplierToDo = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a SupplierToDo id");
            return;
        }
        const deletedSupplierToDo = await SupplierToDo.findByIdAndDelete(id);
        if (deletedSupplierToDo) {
            res.status(200).send(`SupplierToDo with id: ${id} has been deleted`);
        }
    }
    public updateSupplierToDo = async (req: Request, res: Response) => {
        const updatedSupplierToDo = new SupplierToDo(req.params);
        const updateSupplierToDoId = req.params.id;

        if (!updateSupplierToDoId) {
            res.status(400).send("Please provide a SupplierToDo id");
            return;
        } else if (!updatedSupplierToDo) {
            res.status(400).send("Please provide SupplierToDo");
            return;
        }
        await SupplierToDo.findByIdAndUpdate(updateSupplierToDoId, updatedSupplierToDo);
        res.status(200).send("SupplierToDo has been updated succesfully");
    }
}