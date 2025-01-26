import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-aggie-maroon">
        <ul className="flex justify-around p-4">
            <li><Link to="/" className="text-aggie-white text-xl">Home</Link></li>
            <li><Link to="/dashboard" className="text-aggie-white text-xl">Profile Dashboard</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar
