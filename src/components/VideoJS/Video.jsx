import React, {useEffect, useRef} from 'react';
import videojs from '!video.js';
import "video.js/dist/video-js.css";
import "./Video.css"

function Video({username}) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const onReady = (player) => {
    playerRef.current = player;
    videojs.log('handlingready');

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
    videojs.log('handlingreadyend');

  };
  
  const options = {
    liveui: true,
    autoplay: 'play',
    controls: true,
    responsive: true,
    fluid: true,
    preferFullWindow: true,
    muted: true,
    sources: [{
      src: `/live/${username}/index.mpd`,
      type: 'application/dash+xml'
    }, {
      src: `/live/${username}/index.m3u8`,
      type: 'application/x-mpegURL'
    }]
  };

  useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  console.log('rendered');
  return (
    <div data-vjs-player>
      <div ref={videoRef}/>
    </div>
  );
}

export default Video;