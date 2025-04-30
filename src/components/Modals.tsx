import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
  }
const Modals:React.FC<ConfirmationModalProps> = ({
    open,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
})=>{
    return(
        <Modal open={open} onClose={onClose}>
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg"
        style={{ width: 400 }}
      >
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{message}</Typography>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} variant="outlined">
            {cancelButtonText}
          </Button>
          <Button onClick={onConfirm} variant="contained" color="primary">
            {confirmButtonText}
          </Button>
        </div>
      </Box>
    </Modal>
    )
}
export default Modals;