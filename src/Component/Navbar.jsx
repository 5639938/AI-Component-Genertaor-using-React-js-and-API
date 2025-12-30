import React from 'react'
import { MdWbSunny } from 'react-icons/md'
import { FaUserCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";


function Navbar() {
  return (
    <nav className='flex items-center justify-between px-6 h-[90px] border-b border-gray-800'>
      <div className='logo'>
        <h3 className='text-[30px] font-bold flex items-center justify-center sptext'>GenUI</h3>
      </div>
      <div className=' icons flex items-center gap-[15px]'>
        <div className='icon'><MdWbSunny/></div>
        <div className='icon'><FaUserCircle /></div>
        <div className='icon'><IoSettings/></div>

      </div>
    </nav>
  )
}

export default Navbar
