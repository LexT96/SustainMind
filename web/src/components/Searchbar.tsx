import { Autocomplete, TextField } from "@mui/material"

export const Searchbar = ({options, onInputChange, label, sx}: {options: any[], onInputChange: any, label: string, sx?: any}) => {
    return <Autocomplete
    sx={sx}
    disablePortal
    className="py-3 mx-auto"
    options={options}
    onInputChange={onInputChange}
    renderInput={(params) => <TextField {...params} label={label} />}
  />
}