import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Box,
  TextareaAutosize,
  CardMedia,
} from "@mui/material";
import Swal from "sweetalert2";

function InfoPage() {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const addProducts = useSelector((store) => store.getProducts);

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

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your changes will not be saved.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setUrl("");
        setDescription("");
        setCouponCode("");
        Swal.fire("Cancelled!", "Your changes have been discarded.", "success");
      }
    });
  };

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
          />
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" sx={{ cursor: "pointer" }}>
          Add Product
        </Button>
      </div>
    </form>
  );
}

export default InfoPage;
