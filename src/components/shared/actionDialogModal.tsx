"use client";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";

type Props = {
  open: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  title: string;
  cancelText?: string;
  confirmText?: string;
  isDestructiveAction?: boolean;
  children?: React.ReactNode;
};

const ActionDialogModal = ({ open, onClose, onConfirm, title = "Dialog box", cancelText = "Cancel", confirmText = "Confirm", isDestructiveAction = false, children }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      {children && (
        <Box>
          <DialogContent>{children}</DialogContent> <Divider />
        </Box>
      )}
      <DialogActions>
        {onClose && (
          <Button onClick={onClose} variant="outlined" color="primary">
            {cancelText}
          </Button>
        )}
        <Button onClick={onConfirm} variant="contained" color={isDestructiveAction ? "error" : "primary"}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialogModal;
