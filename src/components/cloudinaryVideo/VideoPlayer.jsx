import { useEffect, useRef } from 'react';

const VideoPlayer = () => {

  const cloudinaryRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if ( cloudinaryRef.current ) return;

    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: 'colbycloud-examples',
      fluid: true,
    })
  }, []);

  return (
      <video
        ref={videoRef}
        controls
        data-cld-public-id="videos/waterfall"
      />
  );
}

export default VideoPlayer;