import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import UINDropdown from '../components/UINDropdown';
import DeckBoxes from '../components/DeckBoxes';

const ProfileDash = () => {
  return (      
    <div className="h-screen py-20">      
      <DeckBoxes />
    </div>
  );
};

export default ProfileDash;
