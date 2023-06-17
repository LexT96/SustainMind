import { API_URL } from "../config";

export const getAllSuppliersForMarketplace = async () => {
    const response = await fetch(`${API_URL}/customer/marketplace`);
    return await response.json();
}