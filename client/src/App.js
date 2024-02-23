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

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/create" element={<LeaveForm />} />
        <Route path="/" element={<LeaveList />} />
        <Route path="/all-list" element={<LeaveApproval />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;