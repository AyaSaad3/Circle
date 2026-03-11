import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='bg-linear-270 from-[#D6DDFF] from-0% via-[#f3f2ff] via-50% to-[#D6DDFF] to-100% min-h-dvh'>
      <Navbar />
      <Outlet />
    </div>
  )
}
