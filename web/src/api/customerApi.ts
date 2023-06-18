import { API_URL } from "../config";

export const getAllSuppliersForMarketplace = async () => {
    const response = await fetch(`${API_URL}/customer/marketplace`);
    return await response.json();
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