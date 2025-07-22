import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import DonationForm from './components/Donar/DonationForm';
import { Toaster } from 'react-hot-toast';
import AdminLogin from './components/Admin/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import Acknowledgement from './components/Donar/Acknowledgement';


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-amber-400 p-2">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path='/admin-login' element={<AdminLogin/>}/>
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/" element={<DonationForm />} />
          <Route path="/donation-ack" element={<Acknowledgement/>} />
          
        </Routes>
      </div>
    
    </Router>
  );
};

export default App;
