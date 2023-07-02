import { useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout"
import { Avatar, Box, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import { ProductScore } from "../components/Products/ProductScore";
import { SupplierRisk } from "../components/Suppliers/SupplierRisk";
import { useCustomerQuery } from "../react-query/customerQueries";
import Prevention from "../components/Suppliers/Prevention"


const risks = [
  {
    _id: "ASD",
    name: "Work safety",
    score: 6,
    explanation: "This is the work safety explanation",
  },
  {
    _id: "ASAD",
    name: "Child labor",
    score: 3,
    explanation: "This is the child labor explanation",
  },
  {
    _id: "ASDASD",
    name: "Environmental impact",
    score: 8,
    explanation: "This is the environmental impact explanation",
  },
  {
    _id: "ASDASDASD",
    name: "Corruption",
    score: 2,
    explanation: "This is the corruption explanation",
  },
];

export const SupplierDetailPage = () => {
    const { id } = useParams();
    const {data: supplier} = useCustomerQuery(id ?? "");
    return (
      <PageLayout>
        {supplier && (
          <>
            <Stack direction={{ xs: "column", sm: "row" }}>
              <Avatar
                src={supplier.image}
                sx={{
                  height: 200,
                  width: 200,
                  border: "1px solid black",
                  mr: 7,
                }}
              />
              <Box className="space-y-4" sx={{ minWidth: 300 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {supplier.companyName}
                </Typography>
                <ProductScore score={supplier.score} />
                <Typography>{supplier.description}</Typography>
              </Box>
            </Stack>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 5 }}>
              Risks
            </Typography>
            <Typography sx={{ mb: 5 }}>
              Potential risks identified based on production countries and
              product categories
            </Typography>
            <Grid container spacing={3} sx={{ ml: 0 }} columnSpacing={2} rowGap={3}>
              {risks.map((risk: any) => (
                <Grid xs={12} md={6} lg={4} key={risk._id}>
                  <SupplierRisk
                    name={risk.name}
                    score={risk.score}
                    explanation={risk.explanation}
                  />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 5, mb: 3 }}>
              Negotiation Power
            </Typography>
            <Card>
              <CardContent>
                <Stack
                  direction={{ sm: "row", xs: "column" }}
                  justifyContent="space-evenly"
                  sx={{}}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      px: 1,
                    }}
                  >
                    <Typography variant="h6">Own: Medium</Typography>
                    <Typography sx={{ color: "gray" }}>
                      Own purchases sum up to 11% of suppliers revenue
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      px: 1,
                    }}
                  >
                    <Typography variant="h6">Shared: High</Typography>
                    <Typography sx={{ color: "gray" }}>
                      Purchases of all SustainMind corporations sum of to 34% of
                      suppliers revenue
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
            <Prevention />
          </>
        )}
      </PageLayout>
    );
}