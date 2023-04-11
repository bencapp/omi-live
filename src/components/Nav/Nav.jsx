import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTheme } from "@emotion/react";

// NOT BEING USED, THIS COMPONENT IS FOR REFERENCE ONLY

function Nav() {
  const user = useSelector((store) => store.user);
  const theme = useTheme();
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "end",
          gap: "5px",
          color: theme.palette.primary.main,
        }}
      >
        <img
          onClick={() => history.push("/home")}
          style={{ width: "50px" }}
          src="/assets/images/logo.png"
        />
        {/* helper text for development */}
        <div style={{ marginBottom: "3px" }}>
          {user.isAdmin ? "streamer" : "viewer"}
        </div>
      </div>
      <LogOutButton />
    </div>
  );
}

export default Nav;
