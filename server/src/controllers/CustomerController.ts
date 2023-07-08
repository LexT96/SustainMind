import { Customer } from "../models/customer.js";
import { Request, Response } from "express";
import { IsSupplier } from "../models/isSupplier.js";
// @ts-ignore
import {getPdf} from "../risk_analysis/generatePdf.js"
import { ProductionSite } from "../models/productionSite.js";

const customers = [
    {
      id: "648db5cc159cc359f22a64e9",
      companyName: "Hossain Clothing Company",
      image: "logos/logo2.jpg",
      numberOfProductionSites: 2,
      productCategories: ["Textiles", "Consumer Electronics"],
      score: 3.6,
      city: "Chittagong",
      country: "Bangladesh",
      description:
        "Hossain Clothing Company, located at the heart of Bangladesh's vibrant textile industry, is a premier apparel manufacturer renowned for its quality, craftsmanship, and sustainable practices. With decades of experience, we specialize in creating a diverse range of clothing items - from daily wear to high-fashion ensembles. Our commitment to excellence and adherence to ethical sourcing and manufacturing have positioned us as a trusted supplier to brands worldwide. Proudly Bangladeshi, Hossain Clothing Company continues to push the boundaries in garment production, integrating traditional techniques with innovative technologies to offer top-quality, stylish, and affordable fashion.",
    },
    {
      id: "648db5cc159cc359f22a64e9",
      companyName: "Mumbai Shirts&Coffee",
      image: "logos/logo3.jpg",
      numberOfProductionSites: 7,
      productCategories: ["Textiles", "Food and Beverage"],
      score: 5.4,
      city: "Mumbai",
      country: "India",
      description:
        "Mumbai Shirts&More is an emblem of Indian ingenuity and diversity, serving as a leading textile and food company nestled in the bustling heart of Mumbai. Our textile division excels in the crafting of exquisite shirts, a testament to the skilled craftsmanship and rich textile heritage of India. Simultaneously, our food division caters to the diverse palate of Mumbai, offering an eclectic mix of local and international flavors. At Mumbai Shirts&More, we blend tradition with innovation, offering our customers quality garments and delectable food that capture the vibrant spirit of Mumbai. Experience the blend of style and taste with us, and delve into the essence of Mumbai like never before.",
    },
    {
      id: "648db5cc159cc359f22a64e9",
      companyName: "British Style Ltd.",
      image: "logos/logo1.jpg",
      numberOfProductionSites: 3,
      score: 8.1,
      productCategories: ["Textiles"],
      city: "London",
      country: "United Kingdom",
      description:
        "British Style Ltd. is a cutting-edge fashion startup based in the dynamic city of London. We are dedicated to capturing the quintessential British charm in our unique and innovative designs. From sophisticated trench coats to edgy punk-inspired pieces, our creations draw inspiration from London's rich cultural tapestry and its iconic fashion history. As we navigate the intersection of tradition and modernity, our mission is to deliver style and quality to our customers while embracing sustainable and ethical practices. British Style Ltd. - where London's timeless elegance meets contemporary fashion.",
    },
  ];


export class CustomerController {
  public getAllCustomer = async (req: Request, res: Response) => {
    const Customers = await Customer.find();
    res.send(Customers);
  };
  public getCustomerById = async (req: Request, res: Response) => {
    // const id = req.params.id;
    // if (!id) {
    //     res.status(400).send("Please provide a Customer id");
    //     return;
    // }
    // const customer = await Customer.findById(id);
    // if (!Customer) {
    //     res.status(404).send("Customer not found");
    //     return;
    // }
    res.send(customers[0]);
  };
  public addNewCustomer = async (req: Request, res: Response) => {
    const newCustomer = new Customer(req.body);
    if (!newCustomer) {
      return res.status(400).send("Please provide Customer");
    }
    const newCreatedCustomer = await newCustomer.save();
    res.send(newCreatedCustomer);
  };
  public deleteCustomer = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("Please provide a Customer id");
      return;
    }
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (deletedCustomer) {
      res.status(200).send(`Customer with id: ${id} has been deleted`);
    }
  };
  public updateCustomer = async (req: Request, res: Response) => {
    const updatedCustomer = new Customer(req.params);
    const updateCustomerId = req.params.id;

    if (!updateCustomerId) {
      res.status(400).send("Please provide a Customer id");
      return;
    } else if (!updatedCustomer) {
      res.status(400).send("Please provide Customer");
      return;
    }
    await Customer.findByIdAndUpdate(updateCustomerId, updatedCustomer);
    res.status(200).send("Customer has been updated succesfully");
  };
  public getCustomersForMarketplace = async (req: Request, res: Response) => {
    //TODO: remove above code and uncomment the one below
    // const customers = await Customer.find({ showOnMarketplace: true });
    res.send(customers);
  };

  public getSuppliersOfCustomer = async (req: Request, res: Response) => {
    // const suppliers = await IsSupplier.find({ idCorporation: req.params.id }).populate("idSupplier");
    res.send(customers);
  };

  public createNewRiskAnalysis = async (req: Request, res: Response) => {
    const customerId = req.params.id;
    // const customer = await Customer.findById(customerId);
    const date = new Date();
    const pdf = await getPdf("Testname");
    res.send({
      date: date,
      pdf: pdf,
    });
  };

  public getAllProductSitesOfSupplier = async (req: Request, res: Response) => {
    const supplierId: string = req.params.id;
    // const productionSites = await ProductionSite.find({
    //   company: supplierId,
    // });
    const productionSites = [{
      id: 1,
      name: "T-Shirt Factory",
      location: "Dhaka, Bangladesh",
      numberOfGoals: 3,
      numberOfProducts: 3,
  },
  {
      id: 2,
      name: "Pant Factory",
      location: "Dhaka, Bangladesh",
      numberOfGoals: 3,
      numberOfProducts: 3
  },
  {
      id: 3,
      name: "Hat Factory",
      location: "Dhaka, Bangladesh",
      numberOfGoals: 3,
      numberOfProducts: 3
  },
  {
      id: 4,
      name: "Jacket Factory",
      location: "Dhaka, Bangladesh",
      numberOfGoals: 3,
      numberOfProducts: 3
  }];
  
    // const allSuppliersOfCurrentSupplier: typeof IsSupplier[] = await IsSupplier.find({ idCorporation: supplierId });
    // // get all productionsites of suppliers of current supplier and of the current supplier
    // const productionSites = await ProductionSite.find({
    //   company: {
    //     $or: [
    //       {
    //         $in: allSuppliersOfCurrentSupplier.map(
    //           (supplier: any) => supplier.idSupplier
    //         ),
    //       },
    //       supplierId,
    //     ],
    //   },
    // });
    res.send(productionSites);
  }
}