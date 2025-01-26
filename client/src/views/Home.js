import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import AuthButton from '../components/AuthButton';

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const { profile } = useAuth(); 

  // Watch for changes in the `profile` or `user` state
  useEffect(() => {
    console.log('Profile state changed:', profile); // For debugging purposes
  }, [profile]);  // This will trigger whenever `profile` changes

  // Add another effect to trigger a re-render when the profile is cleared
  useEffect(() => {
    if (!profile) {
      // When profile is null (logged out), re-fetch or reset state
      setError(null);  // Reset error if needed.
    }
  }, [profile]);  // This effect will run when the profile state changes

  return (
    <div>
      <h1>Welcome to Home!</h1>
      {/* AuthButton will handle login/logout logic and redirection */}
      <AuthButton />
    </div>
  );
};

export default Home;
