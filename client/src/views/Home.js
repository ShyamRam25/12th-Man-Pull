import React, { useEffect, useState } from 'react'
import Video from '../assets/Video.mp4';

const Home = () => {
  return (
    <div>
      <video src={Video} autoPlay loop muted />
    </div>
  );
}

export default Home