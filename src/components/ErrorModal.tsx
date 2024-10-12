import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface ErrorModalProps {
  error: string | null;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClose }) => (
  <Dialog open={!!error} onClose={onClose}>
    <DialogTitle>Error</DialogTitle>
    <DialogContent>
      <Typography>{error}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);