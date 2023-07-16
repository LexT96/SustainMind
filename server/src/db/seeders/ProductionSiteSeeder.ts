import { ObjectId } from "mongodb";
import { Customer } from "../../models/customer.js";
import { ProductionSite } from "../../models/productionSite.js";
import { randCompanyName } from '@ngneat/falso';

const locations: any = [
  {
    country: "Germany",
    city: "Berlin",
  },
  {
    country: "India",
    city: "Mumbai",
  },
  {
    country: "Nepal",
    city: "Kathmandu",
  },
  { country: "China", city: "Beijing" },
];

const productionSites: any = [
  {
    name: "Stellar Manufacturing",
    description: "Description of Stellar Manufacturing",
    region: "Baden-Württemberg",
    zipcode: "70173",
    adress: "Stuttgartstraße 1",
  },
  {
    name: "Apex Assembly",
    description: "Description of Apex Assembly",
    region: "NRW",
    zipcode: "51063",
    adress: "Keupstraße 1",
  },
  {
    name: "Innovate Works",
    description: "Description of Innovate Works",
    region: "Lombary",
    zipcode: "20151",
    adress: "Piazzale Angelo Moratti 1",
  },
];

const productionSiteNames: any = [
  "Bavarian Craftsmanship Facility", "Rheinland Manufacturing", "Brandenburg Production Center"
]

const generateProductionSites = async () => {
    const companies = await Customer.find({});
    return await Promise.all(
      companies.map(async (company) => {
        if(company._id.equals(new ObjectId("7a26d68b1230b1e9b6543210")) || company._id.equals(new ObjectId("9f85d32a129040f9b2509798")) || company._id.equals(new ObjectId("9c35d78e1341c2f0b7976422")) || company._id.equals(new ObjectId("8853d75a927858f9c3409059"))){
          let site = productionSites[0];
          site.company = company._id;
          let ps_location = {}
          if(company._id.equals(new ObjectId("7a26d68b1230b1e9b6543210"))){
            // Best Shirts India
            ps_location = {
              country: "India",
              city: "Mumbai",
            };
          }else if (company._id.equals(new ObjectId("9f85d32a129040f9b2509798"))){
            // Twists and Ties
            ps_location = {
              country: "London",
              city: "United Kingdom",
            };
          }else if (company._id.equals(new ObjectId("9c35d78e1341c2f0b7976422"))){
            // Premium Shirts Turkey
            ps_location = {
              country: "Turkey",
              city: "Istanbul",
            };
          }else{
            // Shirts of Tomorrow
            ps_location = {
              country: "Bangladesh",
              city: "Dhaka",
            };
          }
          const ps_name = randCompanyName();

          await new Promise(async (resolve, reject) => {
            const newSite = await ProductionSite.create({
              ...site,
              ...ps_location,
              name: ps_name,
              description: `Description of ${ps_name}`,
            });

            const updatedCompany = await Customer.findByIdAndUpdate(
              company._id,
              { $push: { productionSites: newSite._id } },
              { new: true }
            );

            if (updatedCompany) {
              resolve(updatedCompany);
            } else {
              reject(new Error("Company not found"));
            }
          });
        }else{
          await Promise.all(
            productionSites.map(async (site: any, index: any) => {
              site.company = company._id;
              const ps_location = locations[Math.floor(Math.random() * locations.length)];
              const ps_name = productionSiteNames[index];
              const newSite = await ProductionSite.create({
                ...site,
                ...ps_location,
                name: ps_name,
                description: `Description of ${ps_name}`,
              });
              await Customer.findByIdAndUpdate(
                company._id,
                { $push: { productionSites: newSite._id } },
                { new: true }
              );
            })
          );
        }
      })
    );
}

export const seedProductionSites = async () => {
    console.log("seeding Productionsites...");
    return await generateProductionSites();
  };