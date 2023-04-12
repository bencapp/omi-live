import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import Video from "../VideoJS/Video";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function UserPage() {
  const user = useSelector((store) => store.user);
  const { username } = useParams();
  return (
    <div style={{backgroundColor: "#000000", height: "100vh"}}>
      <Video username={username} />
    </div>
  );
}

export default UserPage;
