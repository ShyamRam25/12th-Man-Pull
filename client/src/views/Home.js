import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import AuthButton from '../components/AuthButton';
import BackgroundVideo from '../components/BackgroundVideo';
import InitialText from '../components/InitialText';

const Home = () => {

  return (
    <div>
      <BackgroundVideo />
      <InitialText />
    </div>

  );
};

export default Home;
