import React, { useState, useRef, useEffect, useMemo } from "react";
import LiveVideo from "../LiveVideo/LiveVideo";
import { useParams, useHistory, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Typography } from "@mui/material";
import Chat from "../../Chat/Chat";
import { useTheme } from "@emotion/react";

import { socket } from "../../../socket";

function StreamView({ height, width, chatHeight, username, yOffset, preview, streamID }) {
  const history = useHistory();
  username = username ? username : useParams().username;
  const playerRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [live, setLive] = useState(true);
  const theme = useTheme();

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
        height,
        width,
      }}
    >
      <div style={{ backgroundColor: "#000000", width, marginTop: yOffset }}>
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
              height: "50%",
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
      {!preview ? (
        <>
          <div style={{ position: "fixed", zIndex: 1 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width,
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
              width,
            }}
          >
            {live ? <Chat height={chatHeight} /> : ""}
          </div>
        </>
      ) : (
        <div
          style={{
            color: "primary",
            height,
            width,
            zIndex: 1,
            position: "fixed",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              width,
              backgroundColor: theme.palette.primary.main,
              color: "#FFFFFF",
              height: "4em",
              display: "flex",
              flexDirection: "row",

            }}
          >
            <div style={{textAlign:"center", alignSelf:"center", width}}
            onClick={() => history.push(`/live/${username}/${streamID}`)}>
              JOIN
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StreamView;
