import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material"
import InventoryIcon from '@mui/icons-material/Inventory';
import SpeedIcon from '@mui/icons-material/Speed';

export const SiteCard = ({site}: {site: any}) => {
    return (
      <Card>
        <CardActionArea>
          <a href={"/sites/" + site.id}>
            <CardContent className="space-y-4 py-8">
              <div className="flex items-center justify-evenly">
                <div className="flex items-center space-x-2">
                  <InventoryIcon className="h-6 w-6" />
                  <Typography  variant="h5" component="div">
                    {site.numberOfProducts}
                  </Typography>
                </div>
                <div className="flex items-center space-x-2">
                  <SpeedIcon className="h-6 w-6" />
                  <Typography  variant="h5" component="div">
                    {site.numberOfGoals}
                  </Typography>
                </div>
              </div>
              <Typography gutterBottom variant="h5" align="center" component="div">
                {site.name}
              </Typography>
              <Typography gutterBottom className="italic" align="center" component="div">
                {site.location}
              </Typography>
            </CardContent>
          </a>
        </CardActionArea>
      </Card>
    );
}