import { useMutation, useQuery } from "react-query";
import { getAllSuppliersForMarketplace, createCustomer, updateCustomer, getCustomer, getProductionSitesByCustomerId, getSuppliersOfCustomer, createNewRiskAnalysis } from "../api/customerApi";

export const useAllSuppliersForMarketplace = () => {
    return useQuery('marketplace', getAllSuppliersForMarketplace);
}

export const useUpdateCustomerMutation = (customerId: string) => {
    return useMutation('updateCustomer', updateCustomer, {
        onSuccess: (data: any) => {
            return data;
        }
    });
}

export const useCreateCustomerMutation = (customerData: any) => {
  return useMutation("createCustomer", createCustomer, {
    onSuccess: (data: any) => {
      return data;
    },
  });
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

export const useCreateNewRiskAnalysisMutation = (customerId: string) => {
    return useMutation("createNewRiskAnalysis", () =>
      createNewRiskAnalysis(customerId)
    );
}