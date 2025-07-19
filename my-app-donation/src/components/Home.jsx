import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate(); 
  return (
    <div className="flex items-center justify-center bg-white min-h-screen w-full">
        <div className="flex gap-4">
            <button className="rounded-full px-6 py-4 bg-green-500 text-white" onClick={()=>navigate('/admin')}>Admin Dashboard</button>
            <button className="rounded-full px-6 py-4 bg-amber-500 text-white" onClick={()=>navigate('/donar')}>Donor Form</button>
        </div>
    </div>
  )
}

export default Home
