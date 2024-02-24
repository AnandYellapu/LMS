import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Link, Typography, CircularProgress } from '@mui/material';
import { AccountCircle, Email, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasswordStrengthBar from 'react-password-strength-bar-with-style-item';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
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

  return (
    <Container maxWidth="sm">
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
              type="password"
              name="password"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <Lock />
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
    </Container>
  );
};

export default Register;
