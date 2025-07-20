import React, { useEffect, useState } from 'react';

const Certificate = (d_id) => {
  const [donor,setDonarData] = useState({});
  
  useEffect(async()=>{
    const res = await fetch(`http://localhost:5000/donar/${d_id}`);
    const data = res.json();
    setDonarData(data);
    console.log(donor);
  },[]);
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-300 rounded-xl shadow-sm text-gray-800 font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md text-xs"><img src={'/logo.jpeg'}/></div>
          <div>
            <h2 className="text-lg font-semibold">Helping Hands Foundation</h2>
            <p className="text-xs text-gray-600">123 Charity Lane, Generosity City, 12345</p>
            <p className="text-xs text-gray-600">+1 234 567 890 | contact@helpinghands.org</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold">Donation Receipt</h2>
          <p className="text-sm font-medium">Receipt No: {donor?._id}</p>
          <p className="text-sm text-gray-600">Date: {donor?.date}</p>
        </div>
      </div>

      {/* Acknowledgment */}
      <div className="bg-gray-100 p-3 my-4 rounded-md">
        Received with thanks from <span className="font-semibold">Mr. {donor?.name}</span>
      </div>

      {/* Donor Details */}
      <div className="grid grid-cols-2 gap-4 border-b pb-4">
        <div>
          <p><strong>Mobile:</strong> {donor?.mobile}</p>
          <p><strong>PAN:</strong> {donor?.PAN}</p>
        </div>
        <div>
          <p><strong>Address:</strong> {donor?.address}</p>
        </div>
      </div>

      {/* Donation Table */}
      <div className="my-4">
        <h3 className="font-semibold text-base mb-2">Donation Details</h3>
        <table className="w-full border border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-3 py-2">Description</th>
              <th className="border px-3 py-2 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">Donation</td>
              <td className="border px-3 py-2 text-right">{donor?.amount}</td>
            </tr>
            <tr>
              <td className="border px-3 py-2 font-semibold">Total Amount</td>
              <td className="border px-3 py-2 text-right font-semibold">₹{donor?.amount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Summary */}
      <div className="mb-4">
        <p><strong>Amount in words:</strong> {donor?.amount_in_words}</p>
        <p><strong>Payment Method:</strong> {donor.payment_mode}</p>
        <p><strong>Transaction ID:</strong> {donor.transactionId}</p>
      </div>

      {/* Org Details and Signature */}
      <div className="flex justify-between border-t pt-4">
        <div className="text-sm">
          <p><strong>Organization Details</strong></p>
          <p>PAN: AABCH1234E</p>
          <p>80G Certificate: 80G/2023/12345</p>
          <p className="text-gray-600 text-xs mt-1">
            This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.
          </p>
        </div>
        <div className="text-right">
          <div className="h-16 border border-gray-300 rounded-md mb-1 flex items-center justify-center text-gray-400">Signature</div>
          <p className="font-semibold">John Doe</p>
          <p className="text-sm text-gray-600">Director</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
