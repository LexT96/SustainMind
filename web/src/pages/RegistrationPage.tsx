import { Box, Typography } from "@mui/material";
import { AuthPageLayout } from "../components/Startside/AuthPageLayout";
import { SignUp } from "@clerk/clerk-react";

function RegistrationsPage() {
  return (
    <AuthPageLayout
      leftSideContent={
        <Box>
          <Typography variant="h3" className="form-title">
            SustainMind
          </Typography>
          <Typography variant="h5" className="form-Logintitle1" sx={{ mb: 3 }}>
            Create an Account
          </Typography>
          <SignUp />
        </Box>
      }
    />
  );
}
export default RegistrationsPage;
