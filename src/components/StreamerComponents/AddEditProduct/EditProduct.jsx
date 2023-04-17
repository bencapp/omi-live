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
//import Public component
import Public from "../../ProductDetail/Public/Public";

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
    <Box>
      <Typography variant="h5"> Edit Product </Typography>

      <form
        onSubmit={handleUpdate}
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

          <InputLabel> Image URL: </InputLabel>
          <TextField
            id="standard-basic"
            variant="standard"
            type="text"
            defaultValue={currentProduct?.image_url}
            value={newProduct.image_url}
            onChange={(e) => handleChange(e, 'image_url')}
          />
          {newProduct.image_url && (
            <CardMedia
              component="img"
              height="250"
              image={currentProduct?.image_url}
              alt="Product Preview"
              style={{ marginTop: "20px" }}
            />
          )}
          <InputLabel>Name:</InputLabel>
          <TextField
            id="standard-basic"
            variant="standard"
            type="text"
            defaultValue={currentProduct?.name}
            value={newProduct.name}
            onChange={(e) => handleChange(e, 'name')}
          />
          <InputLabel> Product URL: </InputLabel>
          <TextField
            id="product-url"
            variant="standard"
            type="text"
            defaultValue={currentProduct?.url}
            value={newProduct.url}
            onChange={(e) => handleChange(e, 'url')}
          />
          {newProduct.url && (
            <Typography>
              <a href={newProduct.url} target="_blank" rel="noreferrer">
                {newProduct.url}
              </a>
            </Typography>
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
            <TextField
              multiline
              defaultValue={currentProduct?.description}
              value={newProduct.description}
              onChange={(e) => handleChange(e, 'description')}
              sx={{
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "3px",
                //  border: "1px solid #ccc",
              }}
            >
            </TextField>
          </label>
          <label style={{ marginBottom: "20px" }}>
            <Typography sx={{ margin: 1 }}> Coupon Code: </Typography>
            <TextField
              // id="standard-basic"
              variant="standard"
              type="text"
              defaultValue={currentProduct?.coupon_code}
              value={newProduct.coupon_code}
              onChange={(e) => handleChange(e, 'coupon_code')}
            />
          </label>
          <InputLabel>Set Coupon Code Expiration</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={dayjs(currentProduct?.coupon_expiration)}
              date={couponExpiration}
              onChange={(date) => setCouponExpiration(date)}
            />
          </LocalizationProvider>
        </div>
        <Public currentProduct={currentProduct} productID={productID}/>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" sx={{ cursor: "pointer" }}>
            Save Changes
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default EditProduct;
