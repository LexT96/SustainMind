import { Box, Stack } from "@mui/material";
import { PageLayout } from "../components/PageLayout"
import { SupplierCard } from "../components/Suppliers/SupplierCard";
import { SuppliersTable } from "../components/Suppliers/SuppliersTable";
import { MarketplaceCard } from "../components/Marketplace/MarketplaceCard";
import { useSuppliersOfCustomerQuery } from "../react-query/customerQueries";
import { useUser } from "@clerk/clerk-react";
export const SuppliersPage = () => {
  const { user } = useUser();
  const {data: suppliers, isLoading, isError} = useSuppliersOfCustomerQuery(user?.unsafeMetadata?.customerId as string ?? "");
    return (
      <PageLayout>
        <Stack spacing={0.5}>
        {suppliers && suppliers.map((supplier: any) => (
          <MarketplaceCard forMarketplace={false} supplier={supplier} />
        ))}
        </Stack>
      </PageLayout>
    );
}