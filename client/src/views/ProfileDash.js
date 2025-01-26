import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

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
    <div>
      <h2>React Google Login</h2>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <button onClick={handleLogout}>Log out</button> {/* Log out button */}
        </div>
      ) : (
        <button onClick={() => handleLogin()}>Sign in with Google 🚀</button>
      )}
    </div>
  );
};

export default ProfileDash;
