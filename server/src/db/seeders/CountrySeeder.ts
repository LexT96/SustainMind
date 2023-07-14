import fs from "fs";
import { parse } from "csv-parse";
import { Country } from "../../models/Country.js";

export const seedCountries = async () => {
  const readCSV = new Promise((resolve, reject) => {
    const rows: any[] = [];
    fs.createReadStream("src/db/esg_scoring/countries.csv").pipe(
      parse({ delimiter: ",", from_line: 2 })
        .on("data", (row) => {
          rows.push(row);
        })
        .on("end", () => {
          resolve(rows);
        })
        .on("error", (error) => {
          reject(error);
        })
    );
  });
  console.log("seeding Countries...");
  const rows = await readCSV;
  return await Promise.all(
    (rows as any).map(async (row: any) => {
      await Country.create({
        name: row[1],
        alpha2: row[2],
        alpha3: row[3],
        region: row[4],
        subRegion: row[5],
        childLaborPercentage: row[6],
        childLabor: row[7],
        modernSlaveryPrevalence: row[8],
        modernSlavery: row[9],
        noFreedomOfAssociation: row[10],
        poorLaborRightsWorkSafety: row[11],
        discrimination: row[12],
        wasteWaterPollution: row[13],
        poorAirQuality: row[14],
        inadequateWasteDisposal: row[15],
        releaseOfHeavyMetals: row[16],
      });
    })
  );
}