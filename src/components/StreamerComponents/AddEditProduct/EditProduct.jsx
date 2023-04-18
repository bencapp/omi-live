import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, TextField, InputLabel, Typography, Box, TextareaAutosize, CardMedia, useTheme } from "@mui/material";
import Swal from "sweetalert2";
//imports for picking date 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function EditProduct() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  // id of product from the URL
  const { productID } = useParams();
  console.log("productID", productID)
  const currentProduct = useSelector((store) => store.currentProduct)
  console.log("currentProduct", currentProduct)

  // const [editMode, setEditMode] = useState(false)

  // if(productID) {
  //   setEditMode(true);
  // }

  const [newProduct, setNewProduct] = useState({
    id: productID,
    name: '',
    image_url: '',
    description: '',
    url: '',
    coupon_code: '',
  });

  const [couponExpiration, setCouponExpiration] = useState(currentProduct?.coupon_expiration);

  // * FOR SETTING VALUES ON PAGE LOAD* 
  useEffect(() => {
    dispatch({
      type: "FETCH_PRODUCT_BY_ID", payload: productID
    })
  }, []);

  useEffect(() => {
    setNewProduct(currentProduct)
  }, [currentProduct]);

  const handleChange = (e, key) => {
    setNewProduct({ ...newProduct, [key]: e.target.value })
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { ...newProduct, coupon_expiration: couponExpiration },
    })
    // dispatch({
    //   type: "UNSET_CURRENT_PRODUCT"
    // })
    history.push(`/product/${productID}`)

  }

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
        history.push(`/product/${productID}`)
        Swal.fire("Cancelled!", "Your changes have been discarded.", "success");
      }
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        width: "90%",
        margin: "auto",
        borderRadius: "5px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          my: "10px",
          fontWeight: "bold",
          fontSize: "1.5rem"
        }}
      >
        EDIT PRODUCT
      </Typography>

      <form
        onSubmit={handleUpdate}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%"
          }}
        >
          <InputLabel>Name:</InputLabel>
          <TextField
            id="standard-basic"
            variant="outlined"
            type="text"
            defaultValue={currentProduct?.name}
            value={newProduct.name}
            onChange={(e) => handleChange(e, 'name')}
            sx={{
              mt: "5px",
              mb: "15px"
            }}
            fullWidth
          />

          <InputLabel >
            Image URL:
          </InputLabel>
          <TextField
            id="standard-basic"
            variant="outlined"
            type="text"
            defaultValue={currentProduct?.image_url}
            value={newProduct.image_url}
            onChange={(e) => handleChange(e, 'image_url')}
            sx={{
              mt: "5px", 
              mb: "5px"
            }}
            fullWidth
          />
          {newProduct?.image_url && (
            <CardMedia
              component="img"
              height="200"
              width="auto"
              image={currentProduct.image_url}
              alt="Image Preview"
              sx={{ mt: "3px", mb: "10px" }}
            />
          )}

          <InputLabel sx={{mt: "15px", mb: "5px"}} > Product URL: </InputLabel>
          <TextField
            id="product-url"
            variant="outlined"
            type="text"
            defaultValue={currentProduct?.url}
            value={newProduct.url}
            onChange={(e) => handleChange(e, 'url')}
            sx={{
              mb: "5px"
            }}
            fullWidth
          />
          {newProduct.url && (
            <Typography
            >
              <a href={newProduct.url} target="_blank" rel="noreferrer">
                {newProduct.url}
              </a>
            </Typography>
          )}


          <InputLabel sx={{ mt: "20px" }}> Description: </InputLabel>
          <TextField
            multiline
            defaultValue={currentProduct?.description}
            value={newProduct.description}
            onChange={(e) => handleChange(e, 'description')}
            fullWidth
            sx={{
              mt: "5px",
              mb: "10px",
            }}
          >
          </TextField>
          <InputLabel sx={{ mt: "10px" }}> Coupon Code: </InputLabel>
          <TextField
            variant="outlined"
            type="text"
            defaultValue={currentProduct?.coupon_code}
            value={newProduct.coupon_code}
            onChange={(e) => handleChange(e, 'coupon_code')}
            fullWidth
            sx={{
              mt: "5px",
              mb: "15px"
            }}
          />
          <InputLabel sx={{ mt: "3px" }}>Set Coupon Code Expiration</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={dayjs(currentProduct?.coupon_expiration)}
              date={couponExpiration}
              onChange={(date) => setCouponExpiration(date)}
              fullWidth
              sx={{
                mb: "30px"
              }}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
          <Button variant="contained" type="button" onClick={handleCancel} color="warning" sx={{ color: "black" }}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" sx={{ cursor: "pointer" }}>
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditProduct;
