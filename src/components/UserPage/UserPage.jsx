import React, { useState, useRef, useEffect, useMemo } from "react";
import Video from "../VideoJS/Video";
import { useParams, useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { IconButton } from "@mui/material";
import Chat from "../Chat/Chat";

function UserPage() {
  const history = useHistory();
  const { username } = useParams();
  const playerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    document.getElementById(playerRef.current.options_.id + '_html5_api').muted = muted;
  }, [muted, playerRef])

  const toggleMute = () => {
    setMuted(!muted);
  }
  
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
        <Video username={username} playerRef={playerRef} />
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
          <IconButton
            variant="outlined"
            size="medium"
            sx={{ width: "1em", mr: ".75em", mt: ".4em"}}
            onClick={toggleMute}
          >
            {muted ? <VolumeOffIcon color="secondary" /> : <VolumeUpIcon color="secondary" /> }
          </IconButton>
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
        <Chat />
      </div>
    </div>
  );
}

export default UserPage;
