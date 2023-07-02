import { Box, Typography } from "@mui/material";
import { AuthPageLayout } from "../components/Startside/AuthPageLayout";
import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
  return (
    <AuthPageLayout
      leftSideContent={
        <Box className="form-content">
          <Typography variant="h3" className="form-title">
            SustainMind
          </Typography>
          <Typography variant="h5" className="form-Logintitle1" sx={{ mb: 3 }}>
            Login to your account
          </Typography>
          <SignIn routing="path" path="/login" />{" "}
        </Box>
      }
    />
  );
}

export default LoginPage;
