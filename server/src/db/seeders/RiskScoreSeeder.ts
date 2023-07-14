import { ProductionSite } from "../../models/productionSite.js";
import { RiskScore } from "../../models/riskScore.js";
import { RiskType } from "../../models/riskType.js";


const priorities = ["High", "Medium", "Low"];
export const seedRiskScores = async () => {
    console.log("seeding RiskScores...");
  const productionSites = await ProductionSite.find({});
  const riskTypes = await RiskType.find({});
  return await Promise.all(
    productionSites.map(async (site) => {
      riskTypes.forEach(async (type) => {
        const newScore = await RiskScore.create({
          productionSite: site._id,
          riskType: type._id,
          priority: priorities[Math.floor(Math.random() * priorities.length)],
          riskScore: Math.floor(Math.random() * 100),
        });
        await ProductionSite.findByIdAndUpdate(
          site._id,
          { $push: { riskScores: newScore._id } },
          { new: true }
        );
      });

    })
  );
};