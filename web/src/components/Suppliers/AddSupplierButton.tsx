import { useState, useEffect, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Searchbar } from '../Searchbar';

const AddSupplierButton = ({suppliers}: any) => {
  const [open, setOpen] = useState(false);
  const [supplierName, setSupplierName] = useState('');
  const [contractVolume, setContractVolume] = useState('');
  const [contractVolumeError, setContractVolumeError] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log('Supplier Name:', supplierName);
    console.log('Contract Volume:', contractVolume);
    setOpen(false);
  };

  const handleSupplierNameChange = (value: string) => {
    setSupplierName(value);
  };

  const performSearch = (query: string) => {
    // Simulating a backend search
    // Replace this code with your actual backend API call
    // Here, we are using a setTimeout to simulate an asynchronous API call
    setTimeout(() => {
      // Simulated search results
      const results: string[] = ['Supplier A', 'Supplier B', 'Supplier C'].filter(supplier =>
        supplier.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }, 300);
  };

  const handleContractVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || parseInt(value) > 0) {
      setContractVolume(value);
      setContractVolumeError('');
    } else {
      setContractVolumeError('Please enter a value greater than zero.');
    }
  };

  useEffect(() => {
    if (!open) {
      setSearchResults([]);
      setSupplierName('');
      setContractVolume('');
      setContractVolumeError('');
    }
  }, [open]);

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Add Supplier
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Supplier</DialogTitle>
        <DialogContent sx={{minWidth: 300}}> 
          <Searchbar
            sx={{width: "100%"}}
            label={"Supplier"}
            options={suppliers.map((s: any) => s.companyName)}
            onInputChange={(event: Event, value: string) => {
              handleSupplierNameChange(value);
            }}
          />
          <TextField
            margin="dense"
            id="contract-volume"
            label="Contract Volume"
            type="number"
            value={contractVolume}
            onChange={handleContractVolumeChange}
            fullWidth
            error={contractVolumeError !== ""}
            helperText={contractVolumeError}
          />
          <ul>
            {searchResults.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSupplierButton;
