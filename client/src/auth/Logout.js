import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ExitToApp as ExitToAppIcon, Cancel as CancelIcon } from '@mui/icons-material';

const Logout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
    setIsLoading(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        <ExitToAppIcon /> Logout
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>Are you sure you want to logout?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<CancelIcon />} color="primary">Cancel</Button>
          <Button onClick={handleLogout} variant="contained" color="primary">
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Logout'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Logout;
