import { RiskScore } from "../models/riskScore.js";
import { Request, Response } from "express";

export class RiskScoreController {
    public getAllRiskScore = async (req: Request, res: Response) => {
        const riskScores = await RiskScore.find();
        res.json(riskScores);
    }

    public getRiskScoreById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: "Please provide a RiskScore id" });
            return;
        }
        const riskScore = await RiskScore.findById(id);
        if (!riskScore) {
            res.status(404).json({ error: "RiskScore not found" });
            return;
        }
        res.json(riskScore);
    }

    public addNewRiskScore = async (req: Request, res: Response) => {
        const newRiskScore = new RiskScore(req.body);
        if (!newRiskScore) {
            res.status(400).json({ error: "Please provide RiskScore" });
            return;
        }

        if (
            newRiskScore.id == null ||
            newRiskScore.productionSite == null ||
            newRiskScore.riskType == null ||
            newRiskScore.riskScore == null ||
            newRiskScore.priority == null
        ) {
            res.status(400).json({ error: "Please provide all Risk Score information" });
            return;
        } else {
            await newRiskScore.save();
            res.status(201).json({ message: "New Risk Score has been added" });
            return;
        }
    }

    public deleteRiskScore = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: "Please provide a RiskScore id" });
            return;
        }
        const deletedRiskScore = await RiskScore.findByIdAndDelete(id);
        if (deletedRiskScore) {
            res.status(200).json({ message: `RiskScore with id: ${id} has been deleted` });
        } else {
            res.status(404).json({ error: "RiskScore not found" });
        }
    }

    public updateRiskScore = async (req: Request, res: Response) => {
        const updateRiskScoreId = req.params.id;
        if (!updateRiskScoreId) {
            res.status(400).json({ error: "Please provide a RiskScore id" });
            return;
        }

        const updatedRiskScore = req.body;
        if (!updatedRiskScore) {
            res.status(400).json({ error: "Please provide RiskScore data" });
            return;
        }

        await RiskScore.findByIdAndUpdate(updateRiskScoreId, updatedRiskScore);
        res.status(200).json({ message: "RiskScore has been updated successfully" });
    }
}
