import React, { useState, useRef, useEffect, useMemo } from "react";
import LiveVideo from "../LiveVideo/LiveVideo";
import { useParams, useHistory, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Typography, Box } from "@mui/material";
import Chat from "../../Chat/Chat";
import { useTheme } from "@emotion/react";
import ProductOverlay from "../ProductOverlay/ProductOverlay";
import { useSelector, useDispatch } from "react-redux";

import { socket } from "../../../socket";

function StreamView({ height, width, chatHeight, username, yOffset, preview }) {
  const user = useSelector((store) => store.user);
  const streamID = useSelector((store) => store.streams.activeStreams);
  const history = useHistory();
  const dispatch = useDispatch();
  username = username ? username : useParams().username;
  const playerRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [live, setLive] = useState(true);
  const theme = useTheme();
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    if (playerRef?.current?.options_?.id) {
      document.getElementById(
        playerRef.current.options_.id + "_html5_api"
      ).muted = muted;
    }
  }, [muted, playerRef]);

  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVE_STREAMS" });
    socket.emit('join stream', user.id);
    //create socket listener for stream closed emit, set live = false
    socket.on("stream_closed", (user) => {
      if (user === username) {
        // setTimeout(() => setLive(false), 5000)
        setLive(false);
      }
    });
    socket.on("update viewer count", (count) => {
      setViewerCount(count);
    });
    return () => {
      socket.emit('leave stream');
      socket.off("stream_closed");
      socket.off("update viewer count");
    };
  }, []);

  const toggleMute = () => {
    setMuted(!muted);
  };

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
      <div align="center" style={{position: "fixed", zIndex: 1, color: "#FFFFFF", width, marginTop: "1em"}}>
          {viewerCount} watching
      </div>
      {!preview ? (
        <>
          <div style={{ position: "fixed", zIndex: 10 }}>
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
              width: "100vw",
            }}
          >
            {live ? (
              <div>
                <Chat height={chatHeight} />
                <ProductOverlay streamID={streamID} />
              </div>
            ) : (
              ""
            )}
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
            <div
              style={{ textAlign: "center", alignSelf: "center", width }}
              onClick={() => history.push(`/live/${username}`)}
            >
              JOIN
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StreamView;
