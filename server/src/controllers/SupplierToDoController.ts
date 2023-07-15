import { SupplierToDo } from "../models/suppliertodo.js";
import { Request, Response } from "express";

export class SupplierToDoController {
  public getAllSupplierToDo = async (req: Request, res: Response) => {
    const supplierToDos = await SupplierToDo.find();
    res.json(supplierToDos);
  };

  public getSupplierToDoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Please provide a SupplierToDo id" });
      return;
    }
    const supplierToDo = await SupplierToDo.findById(id);
    if (!supplierToDo) {
      res.status(404).json({ error: "SupplierToDo not found" });
      return;
    }
    res.json(supplierToDo);
  };

  public addNewSupplierToDo = async (req: Request, res: Response) => {
    const newSupplierToDo = new SupplierToDo(req.body);
    if (!newSupplierToDo) {
      res.status(400).json({ error: "Please provide SupplierToDo" });
      return;
    }

    await newSupplierToDo.save();
    res.status(201).json({ message: "SupplierToDo has been added" });
  };

  public deleteSupplierToDo = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Please provide a SupplierToDo id" });
      return;
    }
    const deletedSupplierToDo = await SupplierToDo.findByIdAndDelete(id);
    if (deletedSupplierToDo) {
      res
        .status(200)
        .json({ message: `SupplierToDo with id: ${id} has been deleted` });
    } else {
      res.status(404).json({ error: "SupplierToDo not found" });
    }
  };

  public updateSupplierToDo = async (req: Request, res: Response) => {
    const updateSupplierToDoId = req.params.id;
    if (!updateSupplierToDoId) {
      res.status(400).json({ error: "Please provide a SupplierToDo id" });
      return;
    }

    const updatedSupplierToDo = req.body;
    if (!updatedSupplierToDo) {
      res.status(400).json({ error: "Please provide SupplierToDo data" });
      return;
    }

    await SupplierToDo.findByIdAndUpdate(
      updateSupplierToDoId,
      updatedSupplierToDo
    );
    res
      .status(200)
      .json({ message: "SupplierToDo has been updated successfully" });
  };
}
