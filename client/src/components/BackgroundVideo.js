import React from 'react'
import Video from '../assets/Video.mp4';

const BackgroundVideo = () => {
  return (
    <div>
          <video src={Video} autoPlay loop muted />
    </div>
  )
}

export default BackgroundVideo