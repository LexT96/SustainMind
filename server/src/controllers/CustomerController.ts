import { Customer } from "../models/customer.js";
import { Request, Response } from "express";
export class CustomerController {
    public getAllCustomer = async (req: Request, res: Response) => {
        const Customers = await Customer.find();
        res.send(Customers);
    }
    public getCustomerById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a Customer id");
            return;
        }
        const customer = await Customer.findById(id);
        if (!Customer) {
            res.status(404).send("Customer not found");
            return;
        }
        res.send(customer);
    }
    public addNewCustomer = async (req: Request, res: Response) => {
        const newCustomer = new Customer(req.params);
        if (!newCustomer) {
            res.status(400).send("Please provide Customer");
            return;
        }
        if (!(await Customer.findOne({ companyName: newCustomer.companyName }))) {
            await newCustomer.save();
          }
          else {
            res.status(400).send("Company name already exists");
            return;
        }
        }
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
    }
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
    }
    public getCustomersForMarketplace = async (req: Request, res: Response) => {
        const customers = [
            {
              id: 1,
              companyName: "SupplierName",
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
              id: 1,
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
              id: 1,
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
          //TODO: remove above code and uncomment the one below
        // const customers = await Customer.find({ showOnMarketplace: true });
        res.send(customers);
    }
}