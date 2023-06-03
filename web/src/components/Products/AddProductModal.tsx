import { Dispatch, SetStateAction } from "react"
import { AddModal } from "../AddModal"
import { Typography } from "@mui/material";

export const AddProductModal = ({open, setOpen}: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) => {
    return (
      <AddModal
        open={open}
        setOpen={setOpen}
      >
        <Typography>
            
        </Typography>
      </AddModal>
    );
}