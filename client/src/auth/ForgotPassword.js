import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for email format
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://lms-be-tk3j.onrender.com/api/users/forgot-password', { email });   //eslint-disable-line
      setMessage('An email with instructions to reset your password has been sent to your inbox.'); // Feedback for successful submission
      toast.success('An email with instructions to reset your password has been sent to your inbox.');

      // Redirect after successful submission
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message); // Display specific error message from the server
        toast.error(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again later.'); // Generic error message
        toast.error('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container maxWidth="sm">
      <h1 style={{textAlign:'center'}}>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
      {message && (
        <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default ForgotPassword;
