import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ResetConfirmationDialog({ open, onConfirm, onCancel }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          border: "2px dashed rgba(255,159,28,0.55)",
          bgcolor: "#fffdf6",
        },
      }}
    >
      <DialogTitle sx={{ fontFamily: "Comic Sans MS", color: "primary.main" }}>
        Reset the board?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will clear all answered questions. This cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
}
