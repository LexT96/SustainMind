import { Box, Card, Tooltip, Typography } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
export const SupplierRisk = ({ name, score, explanation }: { name: string, score: number, explanation: string}) => {
    const riskWidth = 320;
    const riskPosition = (score / 10) * riskWidth - 6 + "px";
    return (
      <Card sx={{ width: 350, p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{name}</Typography>
          <Tooltip title={explanation} placement="bottom">
            <HelpIcon sx={{ width: 20, height: 20, color: "#909090" }} />
          </Tooltip>
        </Box>
        <Box
          sx={{
            mt: 2,
            width: riskWidth,
            height: 6,
            background: "#A3CDFF",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 24,
              background: "#A3CDFF",
              width: 6,
              marginLeft: riskPosition,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            color: "#909090",
          }}
        >
          <Typography>Low Risk</Typography>
          <Typography>High Risk</Typography>
        </Box>
      </Card>
    );
};