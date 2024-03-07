import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeaveForm from './components/LeaveForm';
import LeaveList from './components/LeaveList';
import LeaveApproval from './components/LeaveApproval';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Logout from './auth/Logout';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/list"
          element={
            <>
              <Navbar />
              <LeaveList />
              <Footer />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <Navbar />
              <LeaveForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/all-list"
          element={
            <>
              <Navbar />
              <LeaveApproval />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
