import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Cancel, CheckCircle } from '@mui/icons-material';

const Confirmation = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Submission</DialogTitle>
      <DialogContent>Are you sure you want to submit the leave request?</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" startIcon={<Cancel />}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" startIcon={<CheckCircle />} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
