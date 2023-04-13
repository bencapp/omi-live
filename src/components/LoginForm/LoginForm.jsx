import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { TextField, Button, Box, FormControl } from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
      history.push("/home");
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <>
      <form onSubmit={login}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "80%",
            margin: "30% auto 20px",
          }}
        >
          <h3>LOG IN</h3>
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
          <Button type="submit">LOG IN</Button>
        </Box>
      </form>
      {errors.loginMessage && (
        <Box
          sx={{ width: "80%", textAlign: "center", margin: "15px auto" }}
          className="alert"
          role="alert"
        >
          {errors.loginMessage}
        </Box>
      )}
    </>
  );
}

export default LoginForm;
