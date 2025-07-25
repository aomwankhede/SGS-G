/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';


// axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = 'https://sgs-2jrp.onrender.com';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [donars, setDonar] = useState([]);
  const [filteredDonars, setFilteredDonars] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch donations from backend
  useEffect(() => {
    axios
      .get('/donations')
      .then((res) => {
        setDonar(res.data);
        setFilteredDonars(res.data?.filter((donation) => donation.isVerified));
      })
      .catch((err) => console.error('Error fetching donations:', err));
  }, []);

  // Search filtering logic
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = donars.filter(
      (donar) =>
        donar.name.toLowerCase().includes(lower) ||
        donar.mobile.includes(searchTerm)
    );
    setFilteredDonars(filtered);
  }, [searchTerm, donars]);

  // Handle donation verification
  const handleVerify = async (id) => {
    try {
      await axios.put(`/donations/${id}/verify`);
      const updated = donars.map((d) =>
        d._id === id ? { ...d, isVerified: true } : d
      );
      setDonar(updated);
      setFilteredDonars(updated);
    } catch (err) {
      console.error('Error verifying donation:', err);
    }
  };

  const handleView = async (transactionId) => {
    const extensions = ['png', 'jpg', 'jpeg'];

    for (let ext of extensions) {
      const url = `${axios.defaults.baseURL}/uploads/${transactionId}.${ext}`;
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          window.open(url, '_blank');
          return;
        }
      } catch (error) {
        console.error(`Error checking file ${url}:`, error);
      }
    }

    alert('No image found for this transaction.');
  };

  const verifiedDonations = donars.filter((d) => d.isVerified);
  const totalVerifiedAmount = verifiedDonations.reduce(
    (sum, d) => sum + d.amount,
    0
  );

  return (
    <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 p-6 rounded-2xl text-white shadow-lg">
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Donations Management</h2>
        <p className="text-sm text-white/80">Review and manage all donations</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name or mobile..."
          className="w-full md:w-1/2 px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
        <div className="rounded-lg border border-blue-500 bg-gradient-to-br from-blue-900 to-transparent p-4">
          <p className="text-sm text-white/70 mb-1">Total Donations</p>
          <p className="text-3xl font-semibold text-blue-400">
            {donars.length}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-green-500 bg-gradient-to-br from-green-900 to-transparent p-4">
            <p className="text-sm text-white/70 mb-1">Verified</p>
            <p className="text-3xl font-semibold text-green-400">
              {verifiedDonations.length}
            </p>
          </div>

          <div className="rounded-lg border border-pink-500 bg-gradient-to-br from-pink-900 to-transparent p-4">
            <p className="text-sm text-white/70 mb-1">Total Amount (Verified)</p>
            <p className="text-3xl font-semibold text-pink-300">
              ₹{totalVerifiedAmount}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-col mt-6">
        {filteredDonars.map((donar) => (
          <div
            key={donar._id}
            className={`w-full 
            ${donar.isVerified === true ? 'from-green-500 to-transparent' : 'from-red-500 to-transparent'} 
            to-white bg-gradient-to-br text-white rounded-2xl p-6 shadow-lg 
            flex justify-between items-center mb-6`}
          >
            {/* Donor Info Section */}
            <div>
              <h1 className="text-2xl font-semibold">{donar.name}</h1>
              <div className="mt-4 space-y-1 text-sm text-zinc-600">
                <p>
                  📞 Mobile: <span className="text-white">{donar.mobile}</span>
                </p>
                <p>
                  💰 Amount:{' '}
                  <span className="text-white font-medium">
                    ₹{donar.amount}
                  </span>
                </p>
                <p>
                  📅 Date:{' '}
                  <span className="text-white">
                    {new Date(donar.date).toLocaleString()}
                  </span>
                </p>
                {/* <p>
                  📌 Status:{' '}
                  <span className="text-white font-semibold">
                    {donar.isVerified ? 'Verified':'Pending'}
                  </span>
                </p> */}
                <p>
                 🧾Transaction Id:{''}
                  <span className="text-white font-extrabold text-2xl">{donar.transactionId}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex-col md:flex lg:flex gap-3 ">
              {!donar.isVerified && (
                <button
                  onClick={() => handleVerify(donar._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow-md transition"
                >
                  ✅ Verify
                </button>
              )}
              <button
                onClick={() => handleView(donar.transactionId)}
                className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded-xl shadow-md transition"
              >
                👁️ View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
