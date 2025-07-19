import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full shadow-md bg-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-green-900"><img src='/logo.jpeg' className=' h-15 w-30 object-contain rounded-full'/></span>
      </div>
      <ul className="flex gap-6 text-gray-800 font-medium">
        <li className="text-green-900 border-b-2 border-yellow-500 pb-1">Homepage</li>
        <li>Technology</li>
        <li>Ataraxis Breast</li>
        <li>News & Resources</li>
        <li>Careers</li>
        <li>Portal</li>
      </ul>
      <button className="border border-yellow-500 text-yellow-600 px-4 py-1 rounded-lg font-medium hover:bg-yellow-50 transition">
        Contact Us
      </button>
    </nav>
  );
};

export default Navbar;
