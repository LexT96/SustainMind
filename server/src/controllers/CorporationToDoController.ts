import { CorporationToDo } from "../models/corporationtodo.js";
import { Request, Response } from "express";
export class CorporationToDoController {
    public getAllCorporationToDo = async (req: Request, res: Response) => {
        const CorporationToDos = await CorporationToDo.find();
        res.send(CorporationToDos);
    }
    public getCorporationToDoById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a CorporationToDo id");
            return;
        }
        const corporationToDo = await CorporationToDo.findById(id);
        if (!corporationToDo) {
            res.status(404).send("CorporationToDo not found");
            return;
        }
        res.send(corporationToDo);
    }
    public addNewCorporationToDo = async (req: Request, res: Response) => {
        const newCorporationToDo = new CorporationToDo(req.params);
        if (!newCorporationToDo) {
            res.status(400).send("Please provide CorporationToDo");
            return;
        }
            await newCorporationToDo.save();
            res.status(200).send('CorporationToDo has been added')
        
        }
    public deleteCorporationToDo = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a CorporationToDo id");
            return;
        }
        const deletedCorporationToDo = await CorporationToDo.findByIdAndDelete(id);
        if (deletedCorporationToDo) {
            res.status(200).send(`CorporationToDo with id: ${id} has been deleted`);
        }
    }
    public updateCorporationToDo = async (req: Request, res: Response) => {
        const updatedCorporationToDo = new CorporationToDo(req.params);
        const updateCorporationToDoId = req.params.id;

        if (!updateCorporationToDoId) {
            res.status(400).send("Please provide a CorporationToDo id");
            return;
        } else if (!updatedCorporationToDo) {
            res.status(400).send("Please provide CorporationToDo");
            return;
        }
        await CorporationToDo.findByIdAndUpdate(updateCorporationToDoId, updatedCorporationToDo);
        res.status(200).send("CorporationToDo has been updated succesfully");
    }
}