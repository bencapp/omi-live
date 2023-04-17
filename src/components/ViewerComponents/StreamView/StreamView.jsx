import React, { useState, useRef, useEffect, useMemo } from "react";
import LiveVideo from "../LiveVideo/LiveVideo";
import { useParams, useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Typography } from "@mui/material";
import Chat from "../../Chat/Chat";

import { socket } from "../../../socket";

function StreamView() {
  const history = useHistory();
  const { username } = useParams();
  const playerRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (playerRef?.current?.options_?.id) {
      document.getElementById(
        playerRef.current.options_.id + "_html5_api"
      ).muted = muted;
    }
  }, [muted, playerRef]);

  const eventList = (e) => {
    console.log(e);
  };

  useEffect(() => {
    //create socket listener for stream closed emit, set live = false
    socket.on("stream_closed", (user) => {
      if (user === username) {
        // setTimeout(() => setLive(false), 5000)
        setLive(false);
      }
    });
    return () => {
      socket.off("stream_closed");
    };
  }, []);

  const toggleMute = () => {
    setMuted(!muted);
  };

  console.log(playerRef);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <div style={{ backgroundColor: "#000000", width: "100vw" }}>
        {live ? (
          <LiveVideo
            username={username}
            playerRef={playerRef}
            setLive={setLive}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              height: "50vh",
            }}
          >
            <IconButton
              variant="outlined"
              size="large"
              sx={{
                alignSelf: "center",
              }}
              onClick={() => setLive(true)}
            >
              <RefreshIcon color="secondary" />
            </IconButton>
            <Typography sx={{ color: "#FFFFFF", alignSelf: "center" }}>
              Sorry, there's no live stream right now
            </Typography>
          </div>
        )}
      </div>
      <div style={{ position: "fixed", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100vw",
          }}
        >
          <IconButton
            variant="outlined"
            size="medium"
            sx={{ width: "1em", ml: ".75em", mt: ".4em" }}
            onClick={() => history.push("/home")}
          >
            <HomeIcon color="secondary" />
          </IconButton>
          {live ? (
            <IconButton
              variant="outlined"
              size="medium"
              sx={{ width: "1em", mr: ".75em", mt: ".4em" }}
              onClick={toggleMute}
            >
              {muted ? (
                <VolumeOffIcon color="secondary" />
              ) : (
                <VolumeUpIcon color="secondary" />
              )}
            </IconButton>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          zIndex: 1,
          alignSelf: "flex-end",
          width: "100vw",
        }}
      >
        {live ? <Chat height={"20vh"} /> : ""}
      </div>
    </div>
  );
}

export default StreamView;
