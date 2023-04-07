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
    // <form className="formPanel" onSubmit={registerUser}>
    //   <h2>Register User</h2>
    //   {errors.registrationMessage && (
    //     <h3 className="alert" role="alert">
    //       {errors.registrationMessage}
    //     </h3>
    //   )}
    //   <div>
    //     <label htmlFor="username">
    //       Username:
    //       <input
    //         type="text"
    //         name="username"
    //         value={username}
    //         required
    //         onChange={(event) => setUsername(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label htmlFor="password">
    //       Password:
    //       <input
    //         type="password"
    //         name="password"
    //         value={password}
    //         required
    //         onChange={(event) => setPassword(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <input className="btn" type="submit" name="submit" value="Register" />
    //   </div>
    // </form>
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
