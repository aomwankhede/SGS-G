import React from 'react';
import { useLocation } from 'react-router-dom';

const Acknowledgement = () => {
  const location = useLocation();
  const donarData = location.state?.donarData;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9fafb] to-[#e2e8f0] p-6">
      <div className="bg-gradient-to-br from-green-100 to-green-300 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        
        <div className="flex justify-center mb-4">
          <img src="/logo.jpeg" alt="Logo" className="h-24 w-24 rounded-full shadow-lg border-4 border-white" />
        </div>

        <h2 className="text-2xl font-bold text-green-900 mb-2">Donation Received</h2>

        <p className="text-green-800 font-medium">
          We have successfully received your donation, <span className="font-semibold">{donarData.name}</span>.
        </p>
        
        <p className="mt-2 text-green-800">
          Amount Donated: <span className="font-bold">₹{donarData.amount}</span>
        </p>

        <p className="mt-2 text-green-800">
          A confirmation email will be sent to <span className="font-medium">{donarData.emailId}</span>
        </p>

        <p className="mt-4 italic text-green-900 font-semibold">
          Thank you for your kind donation.
          <br />
          <span className="text-lg">🙏 Om Shri Ganeshay Namah 🙏</span>
        </p>
      </div>
    </div>
  );
};

export default Acknowledgement;
