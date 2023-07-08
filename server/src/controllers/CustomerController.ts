import { Customer } from "../models/customer.js";
import { Request, Response } from "express";
import { IsSupplier } from "../models/isSupplier.js";
// @ts-ignore
import {getPdf} from "../risk_analysis/generatePdf.js"
import { ProductionSite } from "../models/productionSite.js";

const mockCustomers = [
    {
      id: "648db5cc159cc359f22a64e9",
      companyName: "TestSupp",
      image: "https://picsum.photos/300",
      numberOfProductionSites: 3,
      productCategories: ["Textiles", "Consumer Electronics"],
      score: 3.5,
      city: "Bangladesh",
      country: "India",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet nisi tincidunt, interdum tellus a, dignissim diam. Mauris luctus consequat erat nec rhoncus. Suspendisse consequat, purus in faucibus porttitor, odio sem viverra nisi, non hendrerit tellus augue at dui. Nam at finibus justo, sed condimentum nisi. Suspendisse gravida aliquam leo, in tempor nibh pulvinar in. Suspendisse iaculis massa eu diam tincidunt varius eget eu mi. Curabitur pretium ante id ante pellentesque, a convallis mi tempor. ",
    },
    {
      id: "648db5cc159cc359f22a64e9",
      companyName: "SupplierName",
      image: "https://picsum.photos/300",
      numberOfProductionSites: 3,
      productCategories: ["Automotive", "Food and Beverage"],
      score: 3.5,
      city: "Bangladesh",
      country: "India",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet nisi tincidunt, interdum tellus a, dignissim diam. Mauris luctus consequat erat nec rhoncus. Suspendisse consequat, purus in faucibus porttitor, odio sem viverra nisi, non hendrerit tellus augue at dui. Nam at finibus justo, sed condimentum nisi. Suspendisse gravida aliquam leo, in tempor nibh pulvinar in. Suspendisse iaculis massa eu diam tincidunt varius eget eu mi. Curabitur pretium ante id ante pellentesque, a convallis mi tempor. ",
    },
    {
      id: "648db5cc159cc359f22a64e9",
      companyName: "SupplierName",
      image: "https://picsum.photos/300",
      numberOfProductionSites: 3,
      score: 3.5,
      productCategories: ["Textiles", "Automotive", "Food and Beverage"],
      city: "Bangladesh",
      country: "India",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet nisi tincidunt, interdum tellus a, dignissim diam. Mauris luctus consequat erat nec rhoncus. Suspendisse consequat, purus in faucibus porttitor, odio sem viverra nisi, non hendrerit tellus augue at dui. Nam at finibus justo, sed condimentum nisi. Suspendisse gravida aliquam leo, in tempor nibh pulvinar in. Suspendisse iaculis massa eu diam tincidunt varius eget eu mi. Curabitur pretium ante id ante pellentesque, a convallis mi tempor. ",
    },
  ];


export class CustomerController {
  public getAllCustomer = async (req: Request, res: Response) => {
    const customers = await Customer.find();
    res.send(customers);
  };
  public getCustomerById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ error: "Please provide a Customer id"});
        return;
    }
    const customer = await Customer.findById(id);
    if (!Customer) {
        res.status(404).json({ error: "Customer not found"});
        return;
    }
    res.json(customer);
  };
  public addNewCustomer = async (req: Request, res: Response) => {
    const newCustomer = new Customer(req.body);
    if (!newCustomer) {
      return res.status(400).json({ error: "Please provide Customer" });
    }
    const newCreatedCustomer = await newCustomer.save();
    res.json(newCreatedCustomer);
  };
  public deleteCustomer = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Please provide a Customer id" });
      return;
    }
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (deletedCustomer) {
      res
        .status(200)
        .json({ error: `Customer with id: ${id} has been deleted` });
    }
  };
  public updateCustomer = async (req: Request, res: Response) => {
    const updatedCustomer = new Customer(req.params);
    const updateCustomerId = req.params.id;

    if (!updateCustomerId) {
      res.status(400).json({ error: "Please provide a Customer id" });
      return;
    } else if (!updatedCustomer) {
      res.status(400).json({ error: "Please provide Customer" });
      return;
    }
    await Customer.findByIdAndUpdate(updateCustomerId, updatedCustomer);
    res.status(200).json({ error: "Customer has been updated succesfully" });
  };
  public getCustomersForMarketplace = async (req: Request, res: Response) => {
    const customers = (await Customer.find({ showOnMarketplace: true }).populate("productCategories")).map(c => c.toJSON());
    return res.send(customers);
  };

  public getSuppliersOfCustomer = async (req: Request, res: Response) => {
    const suppliers = await IsSupplier.find({
      idCorporation: req.params.id,
    }).populate("idSupplier");
    res.send(suppliers);
  };

  public createNewRiskAnalysis = async (req: Request, res: Response) => {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    const pdfData = await getPdf(customer.companyName);
    if (!pdfData) {
      return res.status(500).json({ error: "Could not create pdf" });
    }
    const newRiskAnalysis = {
      numberOfSuppliers: pdfData.numberOfSuppliers,
      date: new Date(),
      path: pdfData.path.replace("public/", "")
    }
    customer.riskAnalysis.push(newRiskAnalysis);
    const result = await customer.save();
    res.json(result);
  };

  public getAllProductSitesOfSupplier = async (req: Request, res: Response) => {
    const supplierId: string = req.params.id;
    console.log(supplierId)
    const productionSites = await ProductionSite.find({
      company: supplierId
    });
    console.log(productionSites)

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
    res.json(productionSites);
  };
}

