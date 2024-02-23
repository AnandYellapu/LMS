import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<ToastContainer
position="top-right" // Adjust position to top-right
autoClose={5000} // Close the toast after 5 seconds
hideProgressBar={false} // Show progress bar
newestOnTop={false} // Show newest toast at the bottom
closeOnClick // Close toast when clicked
rtl={false} // Set to true for languages that are read right-to-left
pauseOnFocusLoss
draggable
pauseOnHover
/>
    <App />
  </React.StrictMode>
);
