import { Button, Typography } from "@mui/material"
import { PageLayout } from "../components/PageLayout"
import { ProductScore } from "../components/Products/ProductScore"

const mockData = {
    score: 5,
    lastAnalysis: "12.03.2023"
}

export const AnalysisPage = () => {
    return (
      <PageLayout>
        <div className="flex justify-between">
          <div className="w-60 space-y-2">
            <Typography variant="h5">Risks</Typography>
            <ProductScore score={mockData.score} />
            <Typography>Last risk analysis: {mockData.lastAnalysis}</Typography>
            <Button color="success" variant="contained">
                START NEW RISK ANALYSIS
            </Button>
          </div>
          <div>
            <Button color="success" variant="contained">
              Download PDF
            </Button>
          </div>
        </div>
      </PageLayout>
    );
}