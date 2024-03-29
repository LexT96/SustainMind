import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import DryCleaningOutlinedIcon from "@mui/icons-material/DryCleaningOutlined";
import { Box, Card, Tooltip } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
export const ProductCategory = ({ category }: { category: string }) => {
  const width = 20;
  const height = 20;
  let icon;
  if (category === "Apparel and Fashion")
    icon = <DryCleaningOutlinedIcon sx={{ width, height }} />;
  if (category === "Home and Kitchen")
    icon = <RestaurantMenuOutlinedIcon sx={{ width, height }} />;
  if (category === "Automotive")
    icon = <DirectionsCarFilledOutlinedIcon sx={{ width, height }} />;
  if (category === "Health and Beauty")
    icon = <SpaIcon sx={{ width, height }} />;
  if (category === "Consumer Electronics")
    icon = <DevicesOutlinedIcon sx={{ width, height }} />;
  return (
    <Tooltip title={category} placement="bottom">
      <Card
        sx={{
          width: width + 10,
          height: height + 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </Card>
    </Tooltip>
  );
};
