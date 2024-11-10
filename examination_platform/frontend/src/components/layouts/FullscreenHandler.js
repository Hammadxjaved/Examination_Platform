import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';


const FullscreenHandler = () => {
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        fullscreenBtn.style.display = 'block'
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
      }
      if (e.ctrlKey) {
        // e.preventDefault();
      }
      if (e.key.startsWith('F') && !isNaN(e.key.slice(1))  && e.key !== 'F4') {
        e.preventDefault();
    }
    };


    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const goFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.style.display = 'none'
      }
    };

    fullscreenBtn.addEventListener('click', goFullscreen);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      fullscreenBtn.removeEventListener('click', goFullscreen);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  return (
    <>
      <button id="fullscreenBtn" style={{display:'none'}}>Go Fullscreen</button>
    </>
  );
};

export default FullscreenHandler;
