// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { ThemeProvider, CssBaseline } from '@mui/material';
// import { createTheme } from '@mui/material/styles';
// import { ToastContainer } from 'react-toastify'; // Import ToastContainer
// import 'react-toastify/dist/ReactToastify.css'; // Import default styles

// // Define the theme with beautiful colors
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#3f51b5', // Deep Blue
//     },
//     secondary: {
//       main: '#f44336', // Red
//     },
//     background: {
//       default: '#f5f5f5', // Light Gray
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//   },
// });

// // Render the app with the theme, global styles, and toast container
// ReactDOM.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );




import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Define the theme with beautiful colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Deep Blue
    },
    secondary: {
      main: '#f44336', // Red
    },
    background: {
      default: '#f5f5f5', // Light Gray
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
  <CssBaseline />
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <App />
    </ThemeProvider>
  </React.StrictMode>
);
