import { Country } from "../../models/Country.js";
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
      await Promise.all(
        riskTypes.map(async (type) => {
          const matchingCountry = await Country.findOne({
            name: site.country,
          });
          let riskScore = null;
          if (matchingCountry) {
            riskScore = matchingCountry.get("Risk: " + type.name);
          }
          const newScore = await RiskScore.create({
            productionSite: site._id,
            riskType: type._id,
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            riskScore: riskScore ?? Math.floor(Math.random() * 100).toString(),
          });
          await ProductionSite.findByIdAndUpdate(
            site._id,
            { $push: { riskScores: newScore._id } },
            { new: true }
          );
        })
      );
    })
  );
};