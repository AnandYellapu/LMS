import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, IconButton, InputAdornment, Box } from '@mui/material';
import { toast } from 'react-toastify';
import PasswordStrengthBar from 'react-password-strength-bar-with-style-item';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check password strength
    const passwordStrength = getPasswordStrength(newPassword);
    if (passwordStrength < 3) {
      setMessage('Password is too weak. Please choose a stronger password.');
      setIsLoading(false);
      return;
    }

    // Check password match
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match. Please ensure both passwords are the same.');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axios.post('https://lms-be-tk3j.onrender.com/api/users/reset-password', { token, newPassword });
      setMessage(response.data.message);
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to calculate password strength
  const getPasswordStrength = (password) => {
    let score = 0;

    // Length check
    if (password.length >= 8) {
      score++;
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      score++;
    }

    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      score++;
    }

    // Check for numbers
    if (/\d/.test(password)) {
      score++;
    }

    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    }

    return score;
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'90px' }}>
      <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '100%', maxWidth: '400px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <PasswordStrengthBar password={newPassword} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            fullWidth
            style={{ marginTop: '1rem' }}
          >
            {isLoading ? 'Loading...' : 'Reset Password'}
          </Button>
        </form>
        {message && (
          <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ResetPassword;
