import React from "react";
import Video from "../VideoJS/Video";
import { useParams, useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import Chat from "../Chat/Chat";

function UserPage() {
  const history = useHistory();
  const { username } = useParams();
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
        <Video username={username} />
      </div>
      <div style={{ position: "fixed", zIndex: 1 }}>
        <IconButton
          variant="outlined"
          size="medium"
          sx={{ width: "1em", ml: ".75em", mt: ".4em" }}
          onClick={() => history.push("/home")}
        >
          <HomeIcon color="secondary" />
        </IconButton>
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
