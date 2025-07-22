import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const baseURL = 'https://sgs-2jrp.onrender.com';
const baseURL_local = 'http://localhost:5000';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formdata,setFormData] = useState({
    email:"",
    password:""
  })

 const handleChange = (e) =>{
    const {id,value} = e.target;
    setFormData((prevFormData)=>({
      ...prevFormData,
      [id]:value
    }));
  }

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${baseURL}/api/admin/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Login Successful");
      localStorage.setItem('token', data.token);
      console.log("response data from -> ", data);

      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } else {
      toast.error(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error in login:", error);
    toast.error("Login request failed");
  }
};


 return (
    <div className="backdrop-blur-lg min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-orange-300 dark:from-zinc-900 dark:to-zinc-800 px-4">
      <div className="backdrop-blur-lg w-full max-w-md bg-white/35   dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Welcome</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Please Login
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-md font-medium text-gray-700 dark:text-gray-300">
              Email Address<span className='text-red-500 text-xl'>*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="projectmayhem@fc.com"
              className="mt-1 w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-md border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>


          <div>
            <label htmlFor="password" className="block text-md font-medium text-gray-700 dark:text-gray-300">
              Password<span className='text-red-500 text-xl'>*</span>
            </label>
            <input
              id="password"
              type="text"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-md border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-white to-orange-400 dark:from-zinc-800 dark:to-zinc-600 text-white font-semibold py-2 rounded-2xl shadow hover:brightness-110 transition-all"
            onClick={handleLogin}
          >
            Login
          </button>
          
  
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600" />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
