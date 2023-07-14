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

const generateProductionSites = async () => {
    const companies = await Customer.find({});
    return await Promise.all(companies.map( async (company) => {
        const createdSites: any = [];
        productionSites.forEach(async (site: any) => {
          site.company = company._id;
          const randomLocation =
            locations[Math.floor(Math.random() * locations.length)];
          const randomname = randCompanyName();
          const newSite = await ProductionSite.create({
            ...site,
            ...randomLocation,
            name: randomname,
            description: `Description of ${randomname}`,
          });
          createdSites.push(newSite);
        });
        await Customer.findByIdAndUpdate(
          company._id,
          { productionSites: createdSites },
          { new: true }
        );
    }));
}

export const seedProductionSites = async () => {
    console.log("seeding Productionsites...");
    return await generateProductionSites();
  };