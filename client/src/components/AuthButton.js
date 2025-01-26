// src/components/AuthButton.js
import React from 'react';
import { useAuth } from './AuthContext';

const AuthButton = () => {
  const { profile, login, logOut } = useAuth()

  return (
    <div className="text-center mb-5">
      {profile ? (
        <button
          onClick={logOut}
          className="px-4 py-2 bg-red-600 text-white border-none rounded cursor-pointer"
        >
          Log Out
        </button>
      ) : (
        <button
          onClick={login}
          className="px-4 py-2 bg-blue-600 text-white border-none rounded cursor-pointer"
        >
          Get Started
        </button>
      )}
    </div>
  )
}

export default AuthButton;