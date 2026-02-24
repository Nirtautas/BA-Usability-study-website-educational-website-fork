"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  cancelText?: string;
  confirmText?: string;
  isDestructiveAction?: boolean;
  children?: React.ReactNode;
};

const TwoActionDialog = ({ open, onClose, onConfirm, title = "Dialog box", cancelText = "Cancel", confirmText = "Confirm", isDestructiveAction = false, children }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} variant="contained" color={isDestructiveAction ? "error" : "primary"}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TwoActionDialog;
