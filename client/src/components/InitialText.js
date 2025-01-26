import React from 'react';
import sec from '../assets/sec.svg';
import { Link } from 'react-router-dom';

const CenteredPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white -translate-y-16">
        {/* SEC Logo */}
        <img src={sec} alt="SEC Logo" className="h-32 w-32 mb-16" />
        
        {/* Maroon Text */}
        <h1 className="text-9xl font-custom-font text-aggie-maroon font-bold mb-8">
            WATCH US WIN
        </h1>

        {/* Button beneath the text */}
        <Link to = "/About" className="bg-aggie-maroon text-other-white text-3xl px-20 py-8 rounded-md font-custom-font hover:bg-aggie-white hover:text-aggie-maroon transition-all">
            Get Started
        </Link>
    </div>
  );
}

export default CenteredPage;
