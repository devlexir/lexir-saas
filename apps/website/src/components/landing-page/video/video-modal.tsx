import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';

const VideoModal = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  switch (true) {
    case width < 425:
      return (
        <div>
          <ReactPlayer
            url='https://player.vimeo.com/video/718497802?h=e8b9802b50&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            className='flex justify-center  '
            controls
            light={false}
            loop={false}
            // playing={true}
            width={350}
            vimeo
          />
        </div>
      );
    case width >= 426 && width < 600:
      return (
        <div>
          <ReactPlayer
            url='https://player.vimeo.com/video/718497802?h=e8b9802b50&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            className='flex justify-center  '
            controls
            light={false}
            loop={false}
            // playing={true}
            width={400}
            vimeo
          />
        </div>
      );
    case width >= 601 && width < 900:
      return (
        <div>
          <ReactPlayer
            url='https://player.vimeo.com/video/718497802?h=e8b9802b50&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            className='flex justify-center  '
            controls
            light={false}
            loop={false}
            // playing={true}
            width={580}
            vimeo
          />
        </div>
      );
    case width >= 901 && width < 1200:
      return (
        <div>
          <ReactPlayer
            url='https://player.vimeo.com/video/718497802?h=e8b9802b50&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            className='flex justify-center  '
            controls
            light={false}
            loop={false}
            // playing={true}
            width={880}
            height={540}
            vimeo
          />
        </div>
      );
    default:
      return (
        <div>
          <ReactPlayer
            url='https://player.vimeo.com/video/718497802?h=e8b9802b50&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            className='flex justify-center  '
            controls
            light={false}
            loop={false}
            // playing={true}
            width={1200}
            height={600}
            vimeo
          />
        </div>
      );
  }
};

export default VideoModal;
