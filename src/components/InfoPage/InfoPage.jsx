import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Box,
  TextareaAutosize,
} from "@mui/material";

function InfoPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_PRODUCT",
      payload: { title, url, description, couponCode },
    });
    setTitle("");
    setUrl("");
    setDescription("");
    setCouponCode("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      Title:
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      URL:
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {url && (
          <img
            src={url}
            alt="Product Preview"
            width={200}
            height={200}
            style={{ marginTop: "20px" }}
          />
        )}
        {description && (
          <div
            style={{
              marginTop: "20px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "3px",
            }}
          >
            <Typography> Description: {description}</Typography>
          </div>
        )}
      </div>
      <label style={{ marginBottom: "20px", marginTop: "20px" }}>
        Description:
        <TextareaAutosize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "5px",
            borderRadius: "3px",
            border: "1px solid #ccc",
          }}
        />
      </label>
      Coupon Code:
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <Button variant="contained" type="submit">
        {" "}
        Add Product
      </Button>
    </form>
  );
}

export default InfoPage;
