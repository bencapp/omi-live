import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Box,
  TextareaAutosize,
  CardMedia,
} from "@mui/material";

function InfoPage() {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_PRODUCT",
      payload: { url, description, couponCode },
    });
    setUrl("");
    setDescription("");
    setCouponCode("");
  };

  // const handleCopyCouponCode = () => {
  //   navigator.clipboard.writeText(couponCode);
  // };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        margin: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5"> Add Product</Typography>
        <Typography> URL: </Typography>
        <TextField
          id="standard-basic"
          variant="standard"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {url && (
          <img
            src={url}
            alt="Product Preview"
            width={240}
            height={240}
            style={{ marginTop: "20px" }}
          />
        )}
      </Box>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label style={{ marginBottom: "60px" }}>
          <Typography sx={{ margin: 1 }}> Description: </Typography>
          <TextareaAutosize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label style={{ marginBottom: "20px" }}>
          <Typography sx={{ margin: 1 }}> Coupon Code: </Typography>
          <TextField
            id="standard-basic"
            variant="standard"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />{" "}
          {/* <Button variant="contained" onClick={handleCopyCouponCode}>
            Copy
          </Button> */}
        </label>
      </div>
      <Button variant="contained" type="submit" sx={{ cursor: "pointer" }}>
        Add Product
      </Button>
    </form>
  );
}

export default InfoPage;
