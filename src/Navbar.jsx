import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between  bg-gradient-to-r from-violet-700 via-violet-500 to-violet-800 text-white py-4'>
        <div className='logo'>
            <span className='font-bold text-xl mx-8'>iTask</span> 
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
