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
        <div className="flex justify-between">
          <Box className="w-60 space-y-2" sx={{ mb: 6 }}>
            <Typography variant="h5">Risks</Typography>
            <ProductScore score={mockData.score} />
            <Typography>
              Last risk analysis:{" "}
              {dayjs(customer?.riskAnalysis?.slice(-1)[0]?.date).format(
                "DD.MM.YYYY"
              )}
            </Typography>
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