import React from "react";
import Video from "../VideoJS/Video";
import { useParams, useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";

function UserPage() {
  const history = useHistory();
  const { username } = useParams();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ backgroundColor: "#000000", height: "100vh" }}>
        <Video username={username} />
      </div>
      <div style={{ position: "absolute", zIndex: 1}}>
        <IconButton variant="outlined" size="medium" sx={{ width: "1em", ml: ".75em", mt: ".4em" }}
        onClick={() => history.push('/home')}>
          <HomeIcon color="secondary" />
        </IconButton>
      </div>
    </div>
  );
}

export default UserPage;
