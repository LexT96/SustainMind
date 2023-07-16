import { Box, Button, Typography } from "@mui/material"
import { PageLayout } from "../components/PageLayout"
import { ProductScore } from "../components/Products/ProductScore"
import { AnalysisTable } from "../components/Analysis/AnalysisTable"
import { useCreateNewRiskAnalysisMutation, useCustomerQuery } from "../react-query/customerQueries"
import { useUser } from "@clerk/clerk-react"
import dayjs from "dayjs";

const mockData = {
    score: 6.6,
    lastAnalysis: "30.06.2023"
}

export const AnalysisPage = () => {
  const { user } = useUser();
  const { data: customer } = useCustomerQuery(
    (user?.unsafeMetadata?.customerId as string) ?? "649424265080088e66c99bce"
  );
  const {mutate: newRiskAnalysisMutate, isLoading: creatingPdf } = useCreateNewRiskAnalysisMutation(user?.unsafeMetadata?.customerId as string ?? "649424265080088e66c99bce");
    return (
      <PageLayout>
        <img src="/score_graphics.png" alt="ESG Score Image" style={{width: '300px', margin: '0 auto', paddingTop: '30px'}}/>
        <Typography variant="h6" align="center" style={{margin: '0', padding: '0'}}>7.5/10.0</Typography>
        <Typography align="center" style={{margin: '0', padding: '0'}}>Your Overall ESG Score</Typography>

        <div className="flex justify-between" style={{marginTop: '80px', marginBottom: '0px'}}>
          <Box className="w-200 space-y-2" sx={{ mb: 3 }}>
            <Typography variant="h5">Risk Analysis</Typography>
            {/* <ProductScore score={mockData.score} /> */}
            {/*<Typography>
              Last risk analysis:{" "}
              {dayjs(customer?.riskAnalysis?.slice(-1)[0]?.date).format(
                "DD.MM.YYYY"
              )}
              </Typography>*/}
          </Box>
          <div>
            <Button
              color="success"
              variant="contained"
              disabled={creatingPdf}
              onClick={() => {
                newRiskAnalysisMutate();
              }}
            >
              Generate new PDF
            </Button>
          </div>
        </div>

        {customer?.riskAnalysis && (
          <AnalysisTable riskAnalysis={customer.riskAnalysis} />
        )}
      </PageLayout>
    );
}