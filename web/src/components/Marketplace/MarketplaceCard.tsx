import { Avatar, Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { ProductScore } from "../Products/ProductScore";
import PlaceIcon from '@mui/icons-material/Place';
import FactoryIcon from '@mui/icons-material/Factory';
import { ProductCategory } from "./ProductCategory";
export const MarketplaceCard = ({supplier, forMarketplace=true}: any) => {
    return (
      <Box className="rounded-xl border border-green-500 shadow">
        <CardContent>
          <Box
            sx={{
              display: "flex",
              mb: 2,
            }}
          >
            <Avatar sx={{ width: 70, height: 70 }} src={supplier.image} />
            <Box className="flex justify-between w-full">
              <Stack sx={{ ml: 2 }} spacing={0.2}>
                <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {supplier.companyName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PlaceIcon sx={{ width: 20, height: 20 }} />
                  <Typography className="italic" variant="body2">
                    {supplier.city + ", " + supplier.country}
                  </Typography>
                </Box>
              </Stack>
              <Box sx={{ display: "flex" }}>
                <FactoryIcon sx={{ width: 20, height: 20 }} />
                <Typography sx={{ ml: 1 }}>
                  {supplier.numberOfProductionSites}
                </Typography>
              </Box>
            </Box>
          </Box>
          <ProductScore score={supplier.score} />
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {supplier.productCategories.map((category: string) => (
              <ProductCategory category={category} />
            ))}
          </Stack>
        </CardContent>
        <Divider />
        {forMarketplace && (
          <>
            <CardContent>
              <Typography variant="body2">{supplier.description}</Typography>
            </CardContent>
            <Divider />
          </>
        )}
        <CardContent
          sx={{
            background: "rgba(0,200,0,0.08)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            style={{ textTransform: "none" }}
            variant="contained"
            color="success"
            sx={{ width: "100%" }}
            href={"/suppliers/" + supplier.id}
          >
            View this supplier
          </Button>
        </CardContent>
      </Box>
    );
};