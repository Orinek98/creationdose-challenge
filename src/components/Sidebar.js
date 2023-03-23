import React from 'react'
import userImg from '../img/pngwing.com.png'
import { useNavigate } from 'react-router-dom'
const Sidebar = () => {
  const nav = useNavigate()

  return (
    <div className='lg:flex lg:w-10 h-[100vh-5px] flex-col grow items-center bg-slate-100'>
        <div className='pt-12'>
            <img className='w-44' src={userImg} alt="profile-img" />
            <p className='pt-6 text-center text-3xl font-sans mb-2' >Pippo</p>
        </div>
        <button className='bg-sky-50 hover:bg-sky-200 text-gray-700 font-medium mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer' onClick={() =>nav("/")}>Logout</button>
    </div>
  )
}

export default Sidebar