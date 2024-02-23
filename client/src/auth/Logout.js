import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'; // Added import

const Logout = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogout = () => {
    setLoading(true); // Set loading to true when logging out
    // Clear the authentication token from localStorage
    localStorage.removeItem('token');
    toast.success('Logged out successfully'); // Display success toast
    navigate('/login');
    setLoading(false); // Set loading back to false after logging out
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    handleDialogClose();
  };

  return (
    <>
      {loading ? ( // Render loading skeleton if loading state is true
        <Skeleton height={40} width={100} />
      ) : (
        <Button variant="contained" onClick={handleDialogOpen} startIcon={<LogoutIcon />}>Logout</Button>
      )}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Logout;

