
// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Container, Typography, Link, FormControlLabel, Checkbox, CircularProgress, InputAdornment, IconButton, Box, Snackbar, Alert } from '@mui/material';
// import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post('https://lms-be-tk3j.onrender.com/api/users/login', { email, password });
//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       setSnackbarMessage('Login successful!');
//       setOpenSnackbar(true);
//       navigate('/list');
//     } catch (error) {
//       console.error(error.response.data.message);
//       setErrors(error.response.data.errors || {});
//       setSnackbarMessage('Login failed. Please check your credentials.');
//       setOpenSnackbar(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const validationSchema = Yup.object().shape({  //eslint-disable-line
//     email: Yup.string()
//       .email('Invalid email format')
//       .required('Email is required'),
//     password: Yup.string()
//       .required('Password is required'),
//   });

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//       <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '100%', maxWidth: '400px' }}>
//       <h1 style={{textAlign:'center'}}>Login</h1>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             variant="outlined"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             margin="normal"
//             error={Boolean(errors.email)}
//             helperText={errors.email}
//             InputProps={{
//               startAdornment: <Email />,
//             }}
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             type={showPassword ? 'text' : 'password'}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             margin="normal"
//             error={Boolean(errors.password)}
//             helperText={errors.password}
//             InputProps={{
//               startAdornment: <Lock />,
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handlePasswordVisibility} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <FormControlLabel
//             control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
//             label="Remember Me"
//             sx={{ marginBottom: '12px' }}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={isLoading}
//             sx={{ marginBottom: '12px' }}
//             style={{ position: 'relative' }}
//           >
//             {isLoading && <CircularProgress size={24} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
//             Login
//           </Button>
//         </form>
//         <Typography variant="body1" align="center" gutterBottom>
//           <Link href="/forgot-password">Forgot Password?</Link>
//         </Typography>
//         <Typography variant="body1" align="center">
//           Not Yet Registered? <Link href="/register">Register</Link>
//         </Typography>
//       </Box>

//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity="error">
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default Login;
















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Link, FormControlLabel, Checkbox, CircularProgress, InputAdornment, IconButton, Box, Snackbar, Alert } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://lms-be-tk3j.onrender.com/api/users/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
      setSnackbarMessage('Login successful!');
      setOpenSnackbar(true);
      navigate('/list');
    } catch (error) {
      console.error(error.response.data.message);
      setErrors(error.response.data.errors || {});
      setSnackbarMessage('Login failed. Please check your credentials.');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({  //eslint-disable-line
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '100%', maxWidth: '400px' }}>
      <h1 style={{textAlign:'center'}}>Login</h1>
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
            sx={{ marginBottom: '12px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ marginBottom: '12px' }}
            style={{ position: 'relative' }}
          >
            {isLoading && <CircularProgress size={24} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
            Login
          </Button>
        </form>
        <Typography variant="body1" align="center" gutterBottom>
          <Link href="/forgot-password">Forgot Password?</Link>
        </Typography>
        <Typography variant="body1" align="center">
          Not Yet Registered? <Link href="/register">Register</Link>
        </Typography>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;

