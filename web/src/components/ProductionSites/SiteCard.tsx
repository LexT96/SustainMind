import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Stack } from "@mui/material"
import InventoryIcon from '@mui/icons-material/Inventory';
import SpeedIcon from '@mui/icons-material/Speed';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ProductScore } from "../Products/ProductScore";
import { RiskScore } from "./RiskScore";
export const SiteCard = ({site}: {site: any}) => {
    return (
      <Card>
        <CardActionArea>
          <a href={"/sites/" + site._id}>
            <CardContent className="space-y-4 py-8">
              <Typography gutterBottom variant="h5" align="center" component="div">
                {site.name}
              </Typography>
              <Stack spacing={1} direction="row" justifyContent={"center"}>
                <LocationOnOutlinedIcon />
                <Typography gutterBottom className="italic" align="center" component="div">
                {site.city + ", " + site.country}
              </Typography>
              </Stack>
              {/* <RiskScore score={site.averageRiskScore / 10} /> */}

              
            </CardContent>
          </a>
        </CardActionArea>
      </Card>
    );
}