import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/A&M.jpg'

const Navbar = () => {
  return (
    <nav className="bg-aggie-maroon flex fixed w-screen h-20 items-center z-50">
      {/* Left side: About and Home links */}
      <div className="flex-1 flex justify-center mr-auto">
        <Link to="/about" className="text-aggie-white font-custom-font text-2xl mx-80 hover:text-aggie-gray">My Ticket</Link>
        <Link to="/" className="text-aggie-white font-custom-font text-2xl -mx-56 hover:text-aggie-gray">Home</Link>
      </div>

      {/* Centered image */}
      <div>
        <img src = {Logo} className='h-20 w-auto'/>
      </div>

      {/* Right side: Dashboard and FAQ links */}
      <div className="flex-1 flex justify-center ml-auto">
        <Link to="/FAQ" className="text-aggie-white font-custom-font text-2xl -mx-56 hover:text-aggie-gray">FAQ</Link>
        <Link to="/dashboard" className="text-aggie-white font-custom-font text-2xl mx-80 hover:text-aggie-gray">Pull Tickets</Link>
      </div>

      
    </nav>
  )
}

export default Navbar
