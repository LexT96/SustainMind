import { useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout"
import { Avatar, Box, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import { ProductScore } from "../components/Products/ProductScore";
import { SupplierRisk } from "../components/Suppliers/SupplierRisk";
import { useCustomerQuery } from "../react-query/customerQueries";
import Prevention from "../components/Suppliers/Prevention"


const risks = [
  {
    _id: "1",
    name: "Child Labor",
    score: 5.6,
    explanation: "This is the child labor explanation",
  },
  {
    _id: "2",
    name: "Modern Slavery",
    score: 4.816167,
    explanation: "This is the modern slavery explanation",
  },
  {
    _id: "3",
    name: "No Freedom of Association",
    score: 9.61,
    explanation: "This is an explanation",
  },
  {
    _id: "4",
    name: "Poor Labor Rights & Work Safety",
    score: 8.44,
    explanation: "This is an explanation",
  },
  {
    _id: "5",
    name: "Discrimination",
    score: 9.79,
    explanation: "This is an explanation",
  },
  {
    _id: "6",
    name: "Waste Water Pollution",
    score: 10,
    explanation: "This is an explanation",
  },
  {
    _id: "7",
    name: "Poor Air Quality",
    score: 8.56,
    explanation: "This is an explanation",
  },
  {
    _id: "8",
    name: "Inadequate Waste Disposal",
    score: 8.85,
    explanation: "This is an explanation",
  },
  {
    _id: "9",
    name: "Release of Heavy Metals",
    score: 7.72,
    explanation: "This is an explanation",
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
                src="../../public/logos/logo2.jpg"//{supplier.image}
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