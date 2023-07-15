import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import mongoose from 'mongoose';
import { addNewProductionSite } from '../../api/productionSitesApi';
import { useUser } from '@clerk/clerk-react';

const ProductionSiteEditor = () => {
  const [productionSiteName, setProductionSiteName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const {user} = useUser();

  const handleSave = () => {
    const companyId = user!.unsafeMetadata!.customerId  as string
    const data = {
      productionSiteName,
      description,
      productCategory,
      companyId,
      country,
      state,
      city,
      zip,
      address,
    };
     addNewProductionSite(
      productionSiteName,
      description,
      productCategory,
      companyId,
      country,
      state,
      city,
      zip,
      address
      ); 
    console.log('Daten speichern:', data);
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Nur Zahlen zulassen
    setZip(value);
  };
  
  return (
    <div>
      <Typography variant="h6">Production Site Editor</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Production Site Name"
            value={productionSiteName}
            onChange={(e) => setProductionSiteName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Product Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="State/Region"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="ZIP"
            value={zip}
            onChange={handleZipChange}
            fullWidth
            margin="normal"
            required
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            required
          />
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default ProductionSiteEditor;
