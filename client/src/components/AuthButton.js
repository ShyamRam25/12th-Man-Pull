// src/components/AuthButton.js
import React from 'react';
import { useAuth } from './AuthContext';

const AuthButton = () => {
  const { profile, login, logOut } = useAuth();

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {profile ? (
            <button
              onClick={logOut}
              style={{
                padding: '10px 20px',
                backgroundColor: '#d9534f',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Log Out
            </button>
        ) : (
          <button
            onClick={login}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4285F4',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Sign in with Google 🚀
          </button>
        )}
      </div>
  );
};

export default AuthButton;
