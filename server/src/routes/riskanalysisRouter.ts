import express from "express";
import { RiskAnalysisController } from "../controllers/RiskAnalysisController.js";

export const riskScoreRouter = express.Router();
const riskScoreController = new RiskAnalysisController();

riskScoreRouter.use(express.json());

riskScoreRouter.get("/", async (req, res) => {
    await riskScoreController.getAllRiskAnalysis(req, res);
});
  
riskScoreRouter.get("/:id", async (req, res) => {
    await riskScoreController.getRiskAnalysisById(req, res);
});

riskScoreRouter.post("/", async (req, res) => {
    await riskScoreController.addNewRiskAnalysis(req, res);
});

riskScoreRouter.put("/:id", async (req, res) => {
    await riskScoreController.updateRiskAnalysis(req, res);
})

riskScoreRouter.delete("/:id",async (req, res) => {
    await riskScoreController.deleteRiskAnalysis(req, res);
})