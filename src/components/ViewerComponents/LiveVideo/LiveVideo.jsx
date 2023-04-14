import React, { useEffect, useRef } from "react";
import videojs from "!video.js";
import "video.js/dist/video-js.css";

function LiveVideo({ username, playerRef, setLive }) {
  const videoRef = useRef(null);

  const onReady = (player) => {

    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    //set live variable to true if player has media loaded and can play
    player.on("canplay", () => {
      videojs.log("player can play");
      setLive(true);
    })

    //disconnect videojs if there is an error thrown on element
    player.on("error", ()=> {
      setLive(false);
    })

    //log when player disposes
    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const options = {
    liveui: true,
    autoplay: "play",
    preload: true,
    responsive: true,
    fluid: true,
    preferFullWindow: true,
    muted: true,
    sources: [
      {
        src: `/live/${username}/index.mpd`,
        type: "application/dash+xml",
      },
      {
        src: `/live/${username}/index.m3u8`,
        type: "application/x-mpegURL",
      },
    ],
  };

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));

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

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default LiveVideo;
