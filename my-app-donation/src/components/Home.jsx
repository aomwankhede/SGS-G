import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate(); 
  return (
    <div className="relative flex items-center justify-center rounded-2xl bg-white min-h-screen w-full">
        <img 
          src="./logo.jpeg" 
          className="absolute inset-0 w-full h-full object-contain opacity-10 z-0 pointer-events-none" 
          alt="Watermark"
        />
        <div className="flex gap-4">
            <button className="rounded-full px-6 py-4 bg-green-500 text-white" onClick={()=>navigate('/admin')}>Admin Dashboard</button>
            <button className="rounded-full px-6 py-4 bg-amber-500 text-white" onClick={()=>navigate('/donar')}>Donor Form</button>
        </div>
    </div>
  )
}

export default Home
