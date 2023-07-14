import { ProductionSite } from "../../models/productionSite.js";
import { RiskScore } from "../../models/riskScore.js";
import { RiskType } from "../../models/riskType.js";


const priorities = ["High", "Medium", "Low"];

const riskScores = [
  {
    name: "Child Labor",
    description: "Description of Child Labor",
  },
  {
    name: "Modern Slavery",
    description: "Description of Modern Slavery",
  },
  {
    name: "No Freedom of Association",
    description: "Description of No Freedom of Association",
  },
  {
    name: "Poor Labor Rights & Work Safety",
    description: "Description of Poor Labor Rights and Work Safety",
  },
  {
    name: "Discrimination",
    description: "Description of Discrimination",
  },
  {
    name: "Waste Water Pollution",
    description: "Description of Waste Water Pollution",
  },
  {
    name: "Poor Air Quality",
    description: "Description of Poor Air Quality",
  },
  {
    name: "Release of Heavy Metals",
    description: "Description of Release of Heavy Metals",
  },
  {
    name: "Inadequate Waste Disposal",
    description: "Description of Inadequate Waste Disposal",
  },
];

export const seedRiskScores = async () => {
    console.log("seeding RiskScores...");
  const productionSites = await ProductionSite.find({});
  const riskTypes = await RiskType.find({});
  return await Promise.all(
    productionSites.map(async (site) => {
      riskTypes.forEach(async (type) => {
        const createdRiskScores: any = [];
        riskScores.forEach(async (score: any) => {
          score.productionSite = site._id;
          const newScore = await RiskScore.create({
            ...score,
            riskScore: Math.floor(Math.random() * 100),
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            riskType: type._id,
          });
          createdRiskScores.push(newScore);
        });
        return createdRiskScores;
      });

    })
  );
};