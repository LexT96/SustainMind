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
      const countryExists = await Country.findOne({ name: row[1] });
        if (countryExists) {
          return;
        }
      await Country.create({
        name: row[1],
        alpha2: row[2],
        alpha3: row[3],
        region: row[4],
        subRegion: row[5],
        childLaborPercentage: row[6],
        "Risk: Child Labor": row[7],
        modernSlaveryPrevalence: row[8],
        "Risk: Modern Slavery": row[9],
        "Risk: No Freedom of Association": row[10],
        "Risk: Poor Labor Rights and Work Safety": row[11],
        "Risk: Discrimination": row[12],
        "Risk: Waste Water Pollution": row[13],
        "Risk: Poor Air Quality": row[14],
        "Risk: Inadequate Waste Disposal": row[15],
        "Risk: Release of Heavy Metals": row[16],
      });
    })
  );
}