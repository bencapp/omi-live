import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField, Button, Box, FormControl } from "@mui/material";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    console.log("in register user");
    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <>
      <form onSubmit={registerUser}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "80%",
            margin: "30% auto 20px",
          }}
        >
          <h3>SIGN UP</h3>
          <TextField
            sx={{ marginBottom: "10px" }}
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            sx={{ marginBottom: "10px" }}
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit">CONTINUE</Button>
        </Box>
      </form>
      {errors.registrationMessage && (
        <Box
          sx={{ width: "80%", textAlign: "center", margin: "15px auto" }}
          className="alert"
          role="alert"
        >
          {errors.registrationMessage}
        </Box>
      )}
    </>
  );
}

export default RegisterForm;
