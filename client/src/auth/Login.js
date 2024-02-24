import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Link, FormControlLabel, Checkbox, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://lms-be-tk3j.onrender.com/api/users/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error(error.response.data.message);
      setErrors(error.response.data.errors || {});
      toast.error('Login failed. Please check your credentials.'); // Display error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({ //eslint-disable-line
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          error={Boolean(errors.email)}
          helperText={errors.email}
          InputProps={{
            startAdornment: <Email />,
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          error={Boolean(errors.password)}
          helperText={errors.password}
          InputProps={{
            startAdornment: <Lock />,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
          label="Remember Me"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          style={{ position: 'relative' }}
        >
          {isLoading && <CircularProgress size={24} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
          Login
        </Button>
      </form>
      <Typography variant="body1" align="center" gutterBottom>
        <Link href="/forgot-password">Forgot Password?</Link>
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Not Yet Registered? <Link href="/register">Register</Link>
      </Typography>
    </Container>
  );
};

export default Login;
