import { Box, Button, Typography } from "@mui/material"
import { PageLayout } from "../components/PageLayout"
import { ProductScore } from "../components/Products/ProductScore"
import { AnalysisTable } from "../components/Analysis/AnalysisTable"
import { useCreateNewRiskAnalysisMutation } from "../react-query/customerQueries"
import { useUser } from "@clerk/clerk-react"

const mockData = {
    score: 5.2,
    lastAnalysis: "06.07.2023"
}

export const AnalysisPage = () => {
  const { user } = useUser();
  const {mutate: newRiskAnalysisMutate } = useCreateNewRiskAnalysisMutation(user?.unsafeMetadata?.customerId as string ?? "649424265080088e66c99bce");
    return (
      <PageLayout>
        <div className="flex justify-between">
          <Box className="w-60 space-y-2" sx={{ mb: 6 }}>
            <Typography variant="h5">Risks</Typography>
            <ProductScore score={mockData.score} />
            <Typography>Last risk analysis: {mockData.lastAnalysis}</Typography>
          </Box>
          <div>
            <Button
              color="success"
              variant="contained"
              onClick={() => {
                newRiskAnalysisMutate();
              }}
            >
              Generate new PDF
            </Button>
          </div>
        </div>
        <AnalysisTable />
      </PageLayout>
    );
}