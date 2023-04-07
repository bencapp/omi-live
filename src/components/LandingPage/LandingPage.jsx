import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        gap: "10px",
      }}
    >
      {/* TODO: include logo */}
      <Box sx={{ height: "18%", display: "flex", fontSize: "1.5em" }}>
        <Box sx={{ alignSelf: "end", padding: "10px" }}>
          <Box>Omi Live Shopping</Box>
          <Box>An interactive and immersive shopping experience</Box>
        </Box>
      </Box>
      <img src="/assets/images/landing_page.png"></img>
      <Box>Discover eco-friendly and sustainable products</Box>
      <Button onClick={onLogin}>Login</Button>
      <Box>New to Omi Live?</Box>
      <Link to="/registration">Sign Up</Link>
    </Box>
  );
}

export default LandingPage;
