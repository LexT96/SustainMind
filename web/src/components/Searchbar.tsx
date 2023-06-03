import { Autocomplete, TextField } from "@mui/material"

export const Searchbar = ({options, onInputChange, label}: {options: any[], onInputChange: any, label: string}) => {
    return <Autocomplete
    disablePortal
    className="rounded-full mb-12 w-3/4 mx-auto"
    options={options}
    onInputChange={onInputChange}
    renderInput={(params) => <TextField {...params} label={label} />}
  />
}