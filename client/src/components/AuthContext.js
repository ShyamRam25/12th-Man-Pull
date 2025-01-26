import React, { createContext, useState, useContext } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // Initialize the Google login function here
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log('Login successful:', codeResponse); // Debugging log
      setUser(codeResponse);
      // Fetch profile data from Google after successful login
      fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
          Accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Fetched profile:', data); // Debugging log
          setProfile(data);

          // Ensure that navigation happens after the profile is fetched
          if (data) {
            console.log('Navigating to /dashboard');
          } else {
            console.log('Profile not set yet, skipping navigation');
          }
        })
        .catch((err) => console.log('Error fetching profile:', err));
    },
    onError: (error) => {
      console.log('Login Failed:', error);  // Debugging log
    },
  });

  const updateProfile = (profileData) => setProfile(profileData);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, updateProfile, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
