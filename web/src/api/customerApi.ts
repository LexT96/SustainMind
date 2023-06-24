import { API_URL } from "../config";

export const getAllSuppliersForMarketplace = async () => {
    const response = await fetch(`${API_URL}/customer/marketplace`);
    return await response.json();
}

export const getCustomer = async (id: string) => {
    const response = await fetch(`${API_URL}/customer/${id}`);
    return await response.json();
}

export const getSuppliersOfCustomer = async (id: string) => {
    const response = await fetch(`${API_URL}/customer/${id}/suppliers`);
    return await response.json();
}
export const getProductionSitesByCustomerId = async (customerId: string) => {
    const response = await fetch(`${API_URL}/${customerId}/productionSites/`);
    return await response.json();
}