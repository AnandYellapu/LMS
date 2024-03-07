import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Link, Typography, CircularProgress, Box, InputAdornment, IconButton } from '@mui/material';
import { AccountCircle, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasswordStrengthBar from 'react-password-strength-bar-with-style-item';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    
    // Check password strength
    const passwordStrength = getPasswordStrength(values.password);
    if (passwordStrength < 3) {
      toast.error('Password is too weak. Please choose a stronger password.');
      setIsLoading(false);
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('https://lms-be-tk3j.onrender.com/api/users/register', values);
      console.log(response.data);
      toast.success('Registration successful!'); // Display success toast
      navigate('/login'); // Navigate to login page
    } catch (error) {
      console.error(error.response.data.message);
      toast.error('Registration failed. Please try again.'); // Display error toast
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

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
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '100%', maxWidth: '400px' }}>
        <h1 style={{textAlign:'center'}}>Register</h1>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Field
                as={TextField}
                label="Username"
                variant="outlined"
                name="username"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <AccountCircle />
                }}
              />
              <ErrorMessage name="username" component="div" />

              <Field
                as={TextField}
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <Email />
                }}
              />
              <ErrorMessage name="email" component="div" />

              <Field
                as={TextField}
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                name="password"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <Lock />,
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
                  ),
                }}
              />
              <PasswordStrengthBar password={values.password} />
              <ErrorMessage name="password" component="div" />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || isLoading}
                style={{ position: 'relative' }}
              >
                {isLoading && <CircularProgress size={22} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
                Register
              </Button>
            </Form>
          )}
        </Formik>

        <Typography variant="body1" align="center" gutterBottom>
          Already registered? <Link href="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;

