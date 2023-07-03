import express from "express";
import { RiskAnalysisController } from "../controllers/RiskAnalysisController.js";

export const riskAnalysisRouter = express.Router();
const riskAnalysisController = new RiskAnalysisController();

riskAnalysisRouter.use(express.json());

riskAnalysisRouter.get("/", async (req, res) => {
    await riskAnalysisController.getAllRiskAnalysis(req, res);
});
  
riskAnalysisRouter.get("/:id", async (req, res) => {
    await riskAnalysisController.getRiskAnalysisById(req, res);
});

riskAnalysisRouter.post("/", async (req, res) => {
    await riskAnalysisController.addNewRiskAnalysis(req, res);
});

riskAnalysisRouter.put("/:id", async (req, res) => {
    await riskAnalysisController.updateRiskAnalysis(req, res);
})

riskAnalysisRouter.delete("/:id",async (req, res) => {
    await riskAnalysisController.deleteRiskAnalysis(req, res);
})

riskAnalysisRouter.get("/:maxriskscore",async (req, res) => {
    await riskAnalysisController.getMaxRiskValues(req, res);
})

