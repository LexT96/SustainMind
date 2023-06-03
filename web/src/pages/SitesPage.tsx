import { Button, Grid } from "@mui/material";
import { PageLayout } from "../components/PageLayout"
import { Searchbar } from "../components/Searchbar"
import { useState } from "react";
import { SiteCard } from "../components/ProductionSites/SiteCard";
import { AddModal } from "../components/AddModal";


const mockSites = [{
    id: 1,
    name: "T-Shirt Factory",
    location: "Dhaka, Bangladesh",
    numberOfGoals: 3,
    numberOfProducts: 3,
},
{
    id: 2,
    name: "Pant Factory",
    location: "Dhaka, Bangladesh",
    numberOfGoals: 3,
    numberOfProducts: 3
},
{
    id: 3,
    name: "Hat Factory",
    location: "Dhaka, Bangladesh",
    numberOfGoals: 3,
    numberOfProducts: 3
},
{
    id: 4,
    name: "Jacket Factory",
    location: "Dhaka, Bangladesh",
    numberOfGoals: 3,
    numberOfProducts: 3
}];

export const SitesPage = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [matchingSites, setMatchingSites] = useState(mockSites);
    return <PageLayout>
        <Searchbar label="Production Site" options={mockSites.map((s) => s.name)} onInputChange={(event: Event, value: string) => {
            setMatchingSites(mockSites.filter(m => m.name.includes(value)));
        }} />
        <p className="mb-2">{matchingSites.length} Results</p>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {matchingSites.map((site) => (
            <Grid
              className="sm:block"
              item
              xs={12}
              sm={6}
              md={4}
            >
              <SiteCard site={site} />
            </Grid>
          ))}
        </Grid>
    </PageLayout>
}