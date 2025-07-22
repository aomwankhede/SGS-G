import { useState } from 'react';
import axios from 'axios';
import Acknowledgement from './Acknowledgement';
import { toWords } from "number-to-words";

// axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = 'https://sgs-2jrp.onrender.com';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    mobile: '',
    PAN:'',
    emailId: '',
    address: '',
    amount: '',
    payment_method: '',
    transactionId: '',
    amount_in_words: '',
    instrumentDate: '',
    transactionImage: null
  });
  const [amount, setAmount] = useState("");
  const [inWords, setInWords] = useState("");
  const [donarData,setDonorData] = useState({});
  const [errors, setErrors] = useState({ mobile: '' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle mobile validation
    if (name === 'mobile') {
      const isValidMobile = /^\d{10}$/.test(value);
      if (!isValidMobile) {
        setErrors({ ...errors, mobile: 'Mobile number must be exactly 10 digits' });
      } else {
        setErrors({ ...errors, mobile: '' });
      }
    }

    // Handle image file
    if (name === 'transactionImage') {
      setFormData({ ...formData, transactionImage: files[0] });
    } 
    // Handle amount and auto-generate words
    else if (name === 'amount') {
      const numericAmount = Number(value);
      const inWords = value ? toWords(numericAmount) + " only" : "";
      setFormData({ 
        ...formData, 
        amount: value,
        amount_in_words: inWords
      });
    } 
    // Other inputs
    else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      
      const response =  await axios.post('/donations', data);
      setDonorData(response.data);
      alert('Donation submitted successfully');
      <Acknowledgement donarData={donarData}/>
    } catch (err) {
      console.error(err);
      alert('Error submitting donation');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row lg:flex-row gap-4 items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-black p-4">

      <div className="h-[20rem] w-[20rem] flex items-center justify-center rounded-xl shadow-lg p-2">
        <img
          src="/qrcode.jpeg"
          alt="QR Code"
          className="object-contain h-full w-full rounded-md"
        />
      </div>
      {/* <div className='h-[20rem] bg-black w-[20rem]'></div> */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-purple-800 bg-opacity-30 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-2xl text-white">
        <div className="flex justify-center mb-4">
          <div className="bg-pink-500  rounded-full">
            <span className="text-white text-2xl"><img src='logo.jpeg' className='h-30 w-30 object-cover rounded-full'/></span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center">Donation Form</h2>
        <p className="text-sm text-center text-purple-200 mb-6">Your generosity makes a difference. Fill in your details below.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Title *</label>
            <select name="title" onChange={handleChange} className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600">
              <option value="">Select</option>
              <option>Mr</option>
              <option>Ms</option>
              <option>Mrs</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Full Name *</label>
            <input name="name" type="text" onChange={handleChange} className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600" placeholder="Enter your full name" />
          </div>

          <div>
            <label className="block text-sm mb-1">Mobile Number *</label>
            <input name="mobile" type="text" onChange={handleChange} className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600" placeholder="+91 9876543210" />
             {errors.mobile && (
              <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Email ID</label>
            <input name="emailId" type="text" onChange={handleChange} className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600" placeholder="ganesha27@gmail.com" />
          </div>

          <div>
            <label className='block text-sm mb-1'>PAN</label>
            <input
              name="PAN"
              id="PAN"
              type="text"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600"
              placeholder="ABCDE1234F"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Address</label>
            <textarea name="address" onChange={handleChange} className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600" placeholder="Enter your complete address" rows="2" />
          </div>

          <div>
            <label className="block text-sm mb-1">Donation Amount (₹) *</label>
            <input name="amount" type="number" onChange={handleChange} className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600" placeholder="1000" />
          </div>

          <div>
            <label className="block text-sm mb-1">Payment Method</label>
            <select name="payment_method" onChange={handleChange} className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600">
              <option value="">Select payment method</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>Cheque</option>
              <option>Cash</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Transaction ID</label>
            <input name="transactionId" type="text" onChange={handleChange} className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600" placeholder="TXN123456789" />
          </div>

          <div>
            <label className="block text-sm mb-1">Instrument Date</label>
            <input name="date" type="date" onChange={handleChange} className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Sum of Rupees (in words)</label>
            <input name="amount_in_words" type="text" onChange={handleChange} value={formData.amount_in_words}className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600" placeholder="One Thousand Only" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Transaction Screenshot</label>
            <input name="transactionImage" type="file" accept=".png, .jpg, .jpeg" onChange={handleChange} className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-pink-600 file:text-white" />
          </div>
        </div>

        <button type="submit" className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300">
          Submit Donation
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
