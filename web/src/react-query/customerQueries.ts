import { getAllSuppliersForMarketplace, getCustomer, getProductionSitesByCustomerId, getSuppliersOfCustomer } from "../api/customerApi";
import { useQuery } from "react-query";

export const useAllSuppliersForMarketplace = () => {
    return useQuery('marketplace', getAllSuppliersForMarketplace);
}

export const useCustomerQuery = (id: string) => {
    return useQuery(['customer', id], () => getCustomer(id));
}

export const useSuppliersOfCustomerQuery = (id: string) => {
    return useQuery(["customer", id, "suppliers"], () =>
      getSuppliersOfCustomer(id)
    );
}

export const useProductionSitesByCustomerIdQuery = (customerId: string) => {
    return useQuery(["customer", customerId, "productionSites"], () =>
      getProductionSitesByCustomerId(customerId)
    );
}