import { useState, useEffect, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllSuppliersForMarketplace } from '../../api/customerApi';
import { useUser } from '@clerk/clerk-react';
import { addNewSupplier } from '../../api/supplierApi';

const AddSupplierButton = ({ suppliers }: any) => {
  const [open, setOpen] = useState(false);
  const [supplierName, setSupplierName] = useState('');
  const [contractVolume, setContractVolume] = useState('');
  const [contractVolumeError, setContractVolumeError] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const {user} = useUser();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const companyId = user!.unsafeMetadata!.customerId  as string
    const suppliers = await getAllSuppliersForMarketplace();
    const selectedSupplier = suppliers.find((supplier: { companyName: string; }) => supplier.companyName === supplierName);
    const idSupplier = selectedSupplier._id;
  
    const newSupplier = await addNewSupplier(companyId, idSupplier, parseInt(contractVolume));

    console.log(newSupplier);
    console.log('Supplier Name:', supplierName);
    console.log('Contract Volume:', contractVolume);
    setOpen(false);
  };

  const handleSupplierNameChange = (event: ChangeEvent<{}>, value: string | null) => {    
    setSupplierName(value || '');
    performSearch(value || '');

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

  const performSearch = async (query: string) => {
    const possibleSuppliers = await getAllSuppliersForMarketplace();
    const filteredSuppliers = possibleSuppliers.filter(
      (supplier: any) => supplier.companyName.toLowerCase().includes(query.toLowerCase())
    );
  
    const existingSupplierNames = suppliers.map((s: any) => s.companyName);
    const uniqueCompanyNames = filteredSuppliers
      .filter((supplier: any) => !existingSupplierNames.includes(supplier.companyName))
      .map((supplier: any) => supplier.companyName);
  
    setSearchResults(uniqueCompanyNames);
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
        <DialogContent sx={{ minWidth: 300 }}>
          <Autocomplete
            sx={{ width: '100%' }}
            options={[...suppliers.map((s: any) => s.companyName), ...searchResults]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Supplier"
                onFocus={() => performSearch('')}
              />
            )}
            onInputChange={handleSupplierNameChange}
          />
          <TextField
            margin="dense"
            id="contract-volume"
            label="Contract Volume"
            type="number"
            value={contractVolume}
            onChange={handleContractVolumeChange}
            fullWidth
            error={contractVolumeError !== ''}
            helperText={contractVolumeError}
          />
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
