import { useUser } from "@clerk/clerk-react";
import { API_URL } from "../config";

const customers = [
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


export const getAllSuppliersForMarketplace = async () => {
    // const response = await fetch(`${API_URL}/customer/marketplace`);
    // return await response.json();
    return customers;
    
}

export const updateCustomer = async (customer: any) => {
    const response = await fetch(`${API_URL}/customer/${customer.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    });
    return await response.json();
}

export const createCustomer = async (customer: any) => {
    const response = await fetch(`${API_URL}/customer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    });
    return await response.json();
}
export const getCustomer = async (id: string) => {
    const response = await fetch(`${API_URL}/customer/${id}`);
    return await response.json();
}

export const getSuppliersOfCustomer = async (id: string) => {
    const response = await fetch(`${API_URL}/customer/${id}/suppliers`);
    // return await response.json();
    return customers;
}
export const getProductionSitesByCustomerId = async (customerId: string) => {
    // const response = await fetch(`${API_URL}/customer/${customerId}/productionSites/`);
    // return await response.json();
    return [
      {
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
        numberOfProducts: 3,
      },
      {
        id: 3,
        name: "Hat Factory",
        location: "Dhaka, Bangladesh",
        numberOfGoals: 3,
        numberOfProducts: 3,
      },
      {
        id: 4,
        name: "Jacket Factory",
        location: "Dhaka, Bangladesh",
        numberOfGoals: 3,
        numberOfProducts: 3,
      },
    ];
}

export const createNewRiskAnalysis = async (customerId: string) => {
    const response = await fetch(`${API_URL}/customer/${customerId}/risk-analysis`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}