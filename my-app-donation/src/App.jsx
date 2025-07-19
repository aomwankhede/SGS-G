import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import DonationForm from './components/Donar/DonationForm';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-amber-400 p-2">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/donar" element={<DonationForm />} />
        </Routes>
      </div>
    
    </Router>
  );
};

export default App;
