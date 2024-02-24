import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Box, MenuItem, Snackbar, CircularProgress } from '@mui/material';
import { Event as EventIcon, DateRange as DateRangeIcon, Send as SendIcon } from '@mui/icons-material';
import { Alert } from '@mui/material';
import Confirmation from './Confirmation';

const LeaveForm = () => {
  const [userName, setUserName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [substitute, setSubstitute] = useState('');
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for managing confirmation dialog visibility

  const validateForm = () => {
    const errors = {};

    if (!userName) {
      errors.userName = 'Please enter your name';
    }

    if (!startDate) {
      errors.startDate = 'Please select a start date';
    } else if (new Date(startDate) < new Date()) {
      errors.startDate = 'Start date must be in the future';
    }

    if (!endDate) {
      errors.endDate = 'Please select an end date';
    } else if (new Date(endDate) <= new Date(startDate)) {
      errors.endDate = 'End date must be after start date';
    }

    if (!type) {
      errors.type = 'Please select a leave type';
    }

    if (!numberOfDays) {
      errors.numberOfDays = 'Please enter the number of days';
    } else if (isNaN(numberOfDays) || numberOfDays <= 0) {
      errors.numberOfDays = 'Number of days must be a positive number';
    }

    return errors;
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (endDate) {
      const start = new Date(e.target.value);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setNumberOfDays(days);
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    if (startDate) {
      const start = new Date(startDate);
      const end = new Date(e.target.value);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setNumberOfDays(days);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsConfirmationOpen(true); // Open confirmation dialog
  };

  const handleConfirmSubmit = async () => {
    setIsConfirmationOpen(false); // Close confirmation dialog
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://lms-be-tk3j.onrender.com/api/leaves/create', {
        userName,
        startDate,
        endDate,
        reason,
        type,
        numberOfDays,
        substitute
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setSnackbarMessage('Leave request created successfully');
      setOpenSnackbar(true);
      clearFormFields();
    } catch (error) {
      console.error(error.response.data.message);
      setSnackbarMessage('Failed to create leave request. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFormFields = () => {
    setUserName('');
    setStartDate('');
    setEndDate('');
    setReason('');
    setType('');
    setNumberOfDays('');
    setSubstitute('');
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Leave Request Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              error={Boolean(errors.userName)}
              helperText={errors.userName}
              InputProps={{
                startAdornment: <EventIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              error={Boolean(errors.startDate)}
              helperText={errors.startDate}
              InputProps={{
                startAdornment: <EventIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              error={Boolean(errors.endDate)}
              helperText={errors.endDate}
              InputProps={{
                startAdornment: <DateRangeIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              error={Boolean(errors.type)}
              helperText={errors.type}
              InputProps={{
                startAdornment: <SendIcon />
              }}
            >
              {['vacation', 'sick leave', 'personal leave', 'maternity leave', 'paternity leave', 'bereavement leave', 'unpaid leave', 'compensatory leave', 'jury duty', 'others'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Number of Days"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(e.target.value)}
              error={Boolean(errors.numberOfDays)}
              helperText={errors.numberOfDays}
              InputProps={{
                startAdornment: <SendIcon />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Substitute"
              value={substitute}
              onChange={(e) => setSubstitute(e.target.value)}
              InputProps={{
                startAdornment: <SendIcon />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              InputProps={{
                startAdornment: <SendIcon />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              startIcon={<SendIcon />}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Confirmation
        open={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LeaveForm;
