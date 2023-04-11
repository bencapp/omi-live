import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// NOT BEING USED, THIS COMPONENT IS FOR REFERENCE ONLY

function Nav() {
  // const user = useSelector((store) => store.user);
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
      <img
        onClick={() => history.push("/home")}
        style={{ width: "50px" }}
        src="/assets/images/logo.png"
      />
      <LogOutButton />
    </div>
  );
}

export default Nav;
