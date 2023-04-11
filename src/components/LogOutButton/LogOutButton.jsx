import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

function LogOutButton() {
  const dispatch = useDispatch();
  return (
    <Button size="small" onClick={() => dispatch({ type: "LOGOUT" })}>
      Log Out
    </Button>
  );
}

export default LogOutButton;
