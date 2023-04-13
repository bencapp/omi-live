import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, TextField, InputLabel, Typography, Box, TextareaAutosize, CardMedia, useTheme} from "@mui/material";
import Swal from "sweetalert2";
//imports for picking date 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function AddEditProduct() {
  const theme = useTheme(); 
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [name, setName] = useState("");
  const [couponExpiration, setCouponExpiration] = useState();

  const currentProduct = useSelector((store) => store.currentProduct)

  // * FOR SETTING VALUES ON PAGE LOAD* 
  // useEffect(() => {
  //   setNewTitle(currentStream?.title);
  //   setNewDescription(currentStream?.description);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_PRODUCT",
      payload: { name, productUrl, imageUrl, description, couponCode, couponExpiration },
    });
    setName("");
    setImageUrl("");
    setProductUrl("");
    setDescription("");
    setCouponCode("");
    setCouponExpiration("");
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
        setImageUrl("");
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
        <InputLabel>Name:</InputLabel>
        <TextField
          id="standard-basic"
          variant="standard"
          type="text"
          defaultValue={currentProduct?.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputLabel> Product URL: </InputLabel>
        <TextField
          id="product-url"
          variant="standard"
          type="text"
          defaultValue={currentProduct?.productUrl}
          value={productUrl}
          onChange={(e) => setProductUrl(e.target.value)}
        />
        {productUrl && (
          <Typography>
            <a href={productUrl} target="_blank" rel="noreferrer">
              {productUrl}
            </a>
          </Typography>
        )}
        <InputLabel> Image URL: </InputLabel>
        <TextField
          id="standard-basic"
          variant="standard"
          type="text"
          defaultValue={currentProduct?.imageUrl}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {imageUrl && (
          <CardMedia
            component="img"
            height="250"
            image={imageUrl}
            alt="Product Preview"
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
          <InputLabel sx={{ margin: 1 }}> Description: </InputLabel>
          <TextareaAutosize
            defaultValue={currentProduct?.description}
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
            // id="standard-basic"
            variant="standard"
            type="text"
            defaultValue={currentProduct?.couponCode}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </label>
        <InputLabel>Set Coupon Code Expiration</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          defaultValue={dayjs(currentProduct?.couponExpiration)}
          date={couponExpiration}
          onChange={(date) => setCouponExpiration(date)}
        />
      </LocalizationProvider>
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

export default AddEditProduct;
