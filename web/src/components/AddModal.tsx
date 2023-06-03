import { Modal, Box, Typography, Button } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react";

export const AddModal = ({
  open,
  setOpen,
  children
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: any;
}) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center"
      >
        <Box className="bg-white rounded p-2 md:w-1/2 md:h-1/2">
            {children}
        </Box>
      </Modal>
    </>
  );
};