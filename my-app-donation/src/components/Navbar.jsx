import React, { useEffect,useState } from 'react';

const Navbar = () => {
  const [token,setToken] = useState("");
  
  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    setToken(localStorage.getItem('token'));

  },[]);

  const handleLogout = () =>{
    try{
      localStorage.removeItem('token');
    }
    catch(error){
      console.log("Error in logout",error);
    }
  }

  return (
    <nav id='navbar' className="w-full shadow-md bg-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-green-900"><img src='/logo.jpeg' className=' h-15 w-30 object-contain rounded-full'/></span>
      </div>
      <ul className="flex gap-6 text-gray-800 font-medium">
        <a href='/'><li id="homepage" className="text-green-900 border-b-2 border-yellow-500 pb-1">Homepage</li></a>
      </ul>
      <ul className="flex gap-6 text-gray-800 font-medium">
        <a href='/admin'><li id="homepage" className="text-green-900 border-b-2 border-yellow-500 pb-1">Admin</li></a>
      </ul>

      {token ? <button className='bg-red-500 rounded-2xl px-4 py-2 text-white' onClick={handleLogout}>Logout</button> : <></>}
      <button className="border border-yellow-500 text-yellow-600 px-4 py-1 rounded-lg font-medium hover:bg-yellow-50 transition">
        Contact Us
      </button>
    </nav>
  );
};

export default Navbar;
