import { Customer } from "../../models/customer.js";
import { ProductCategory } from "../../models/productCategory.js";

const customers = [
  {
    _id: "6499c065722353f7b1585065",
    companyName: "NovaraTech",
    country: "France",
    region: "Normandy",
    cty: "Rouen",
    zipcode: "76000",
    adress: "Rue de Rouen",
    contactPersonName: "Leon",
    contactPersonEmail: "leon@novaratech.com",
    accountType: "CEO",
    numberOfEmployees: "400",
    revenue: "40.000.000$",
    showOnMarketplace: true,
    image: "https://picsum.photos/id/237/200/300",
    description: "Description of NovaraTech",
    productCategories: {
      _id: "6499ca2153037565702d91bd",
    },
    score: 3.5,
  },
  {
    _id: "6499c401722353f7b1585066",
    companyName: "Vortexa",
    country: "Germany",
    region: "NRW",
    city: "Essen",
    zipcode: "45136",
    adress: "Ruhrallee 12",
    contactPersonName: "Markus",
    contactPersonEmail: "markus@vortexa.com",
    accountType: "CEO",
    numberOfEmployees: "100",
    revenue: "10.000.000$",
    showOnMarketplace: true,
    image: "https://picsum.photos/id/237/200/300",
    description: "Description of Vortexa",
    productCategories: {
      _id: "6499ca2153037565702d91bd",
    },
    score: 6,
  },
  {
    _id: "6499c51b722353f7b1585067",
    companyName: "Solara",
    country: "Germany",
    region: "Bavaria",
    city: "Munich",
    zipcode: "80801",
    adress: "Leopoldstraße 12",
    contactPersonName: "Alex",
    contactPersonEmail: "Alex@solara.com",
    accountType: "CEO",
    numberOfEmployees: "50",
    revenue: "5.000.000$",
    showOnMarketplace: true,
    image: "https://picsum.photos/id/237/200/300",
    description: "Description of Solara",
    productCategories: {
      _id: "6499ca4d53037565702d91be",
    },
    score: 4.5,
  },
  {
    _id: "6499c51b722353f7b1585069",
    __v: 27,
    productCategories: [],
    companyName: "TUM Company",
  },
];

export const seedCustomers = async () => {
    console.log("seeding Customers...");
    const productCategories = await ProductCategory.find({});
    return await Promise.all(customers.map(async (customer: any, index) => {
      try {
        customer.productCategories = productCategories;
        await Customer.create(customer);
        return customer;
      } catch (error) {
        console.error(error);
      }
      return false;
    }));
  };
  
