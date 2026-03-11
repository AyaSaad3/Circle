import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className='min-h-screen flex justify-center items-center bg-linear-330 from-[#F3F8FE] from-10% via-[#D5DEFD] via-70% to-[#B2BCFA] to-100%'>
      <div className='border border-purple-100 px-4 py-8 my-8 rounded-2xl w-110 shadow-2xl bg-white/80 backdrop-blur-xl'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
