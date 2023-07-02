import { Box, Button, Grid, Stack } from "@mui/material";
import { PageLayout } from "../components/PageLayout"
import { Searchbar } from "../components/Searchbar"
import { useEffect, useState } from "react";
import { SiteCard } from "../components/ProductionSites/SiteCard";
import { AddModal } from "../components/AddModal";
import { useProductionSitesByCustomerIdQuery } from "../react-query/customerQueries";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";



export const SitesPage = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const {data: productionSites, isLoading} = useProductionSitesByCustomerIdQuery(user?.unsafeMetadata?.customerId as string ?? "649424265080088e66c99bce");
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [matchingSites, setMatchingSites] = useState(productionSites);

    useEffect(() => {
        if (!isLoading && productionSites.length > 0) setMatchingSites(productionSites);
    }, [isLoading])
    return (
      <PageLayout>
        {productionSites?.length > 0 && matchingSites && (
          <>
            <Stack direction="row" spacing={3} alignItems={"center"}>
              <Searchbar
                sx={{ width: "100%" }}
                label="Production Site"
                options={productionSites.map((p: any) => p.name)}
                onInputChange={(event: Event, value: string) => {
                  setMatchingSites(
                    productionSites.filter((p: any) => p.name.includes(value))
                  );
                }}
              />
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate("/ProductionSiteEditor")}
                >
                  Add Production Site
                </Button>
              </Box>
            </Stack>
            <p className="mb-2">{matchingSites.length} Results</p>
            <Grid container rowSpacing={3} columnSpacing={3}>
              {matchingSites.map((site: any) => (
                <Grid className="sm:block" item xs={12} sm={6} md={4}>
                  <SiteCard site={site} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </PageLayout>
    );
}