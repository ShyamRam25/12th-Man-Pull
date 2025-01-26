import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import UINDropdown from '../components/UINDropdown';
import DeckBoxes from '../components/DeckBoxes';

const ProfileDash = () => {
  const { user, profile, login, updateProfile, logOut } = useAuth();


  const handleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => login(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  const handleLogout = () => {
    logOut();  // Clear the context state
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          updateProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user, updateProfile]);

  return (      
    <div className="h-screen py-20">      
      <DeckBoxes />


    </div>
  );
};

export default ProfileDash;
