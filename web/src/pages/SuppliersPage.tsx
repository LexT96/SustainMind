import { Box, Grid, Stack } from "@mui/material";
import { PageLayout } from "../components/PageLayout"
import { SupplierCard } from "../components/Suppliers/SupplierCard";
import { SuppliersTable } from "../components/Suppliers/SuppliersTable";
import { MarketplaceCard } from "../components/Marketplace/MarketplaceCard";
import { useSuppliersOfCustomerQuery } from "../react-query/customerQueries";
import { useUser } from "@clerk/clerk-react";
export const SuppliersPage = () => {
  const { user } = useUser();
  const {data: suppliers, isLoading, isError} = useSuppliersOfCustomerQuery(user?.unsafeMetadata?.customerId as string ?? "649424265080088e66c99bce");
    return (
      <PageLayout>
          <Grid container rowSpacing={3} columnSpacing={3}>
        {suppliers && suppliers.map((supplier: any) => (
          <Grid item xs={12} sm={6} md={4}>
          <MarketplaceCard forMarketplace={false} supplier={supplier} />
          </Grid>
        ))}
        </Grid>
      </PageLayout>
    );
}