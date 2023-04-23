import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  InputLabel,
  Typography,
  Box,
  CardMedia,
  useTheme,
} from "@mui/material";
//imports for picking date
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
//import Public component
import Public from "../../ProductDetail/Public/Public";

import ConfirmationPopup from "../../ConfirmationPopup/ConfirmationPopup";

function ProductForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  // id of product from the URL
  const { productID } = useParams();
  console.log("productID", productID);
  const currentProduct = useSelector((store) => store.currentProduct);
  console.log("currentProduct", currentProduct);

  const [displayConfirmCancel, setDisplayConfirmCancel] = useState(false);

  const [newProduct, setNewProduct] = useState({
    id: productID,
    name: "",
    image_url: "",
    description: "",
    url: "",
    coupon_code: "",
  });

  const [couponExpiration, setCouponExpiration] = useState(
    currentProduct ? currentProduct.coupon_expiration : ""
  );

  useEffect(() => {
    if (productID) {
      dispatch({
        type: "FETCH_PRODUCT_BY_ID",
        payload: productID,
      });
    }
    return () => {
      dispatch({
        type: "UNSET_CURRENT_PRODUCT",
      });
    };
  }, []);

  useEffect(() => {
    setNewProduct(currentProduct);
  }, [currentProduct]);

  const handleChange = (e, key) => {
    setNewProduct({ ...newProduct, [key]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { ...newProduct, coupon_expiration: couponExpiration },
    });

    history.push(`/product/${productID}`);
  };

  //check currentStream to see if this product is part of a s
  const currentStream = useSelector((store) => store.currentStream);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        ...newProduct,
        coupon_expiration: couponExpiration,
        streamID: currentStream?.id,
      },
    });
    setNewProduct({});
    if (currentStream.id) {
      history.push(`/edit-stream/${currentStream.id}`);
    } else {
      history.push(`/home/:view`);
    }
  };

  const confirmCancel = () => {
    if (productID) {
      history.push(`/product/${productID}`);
    } else {
      history.goBack();
    }
  };

  return (
    <>
      {displayConfirmCancel && (
        <ConfirmationPopup
          setDisplayConfirmation={setDisplayConfirmCancel}
          handleConfirm={confirmCancel}
          alertText={`Are you sure you want to cancel? All changes will be lost.`}
          hidePopupText="CANCEL"
          confirmPopupText="CONFIRM"
          top="40vh"
        />
      )}
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
        {productID ? (
          <Typography
            variant="h5"
            align="center"
            sx={{
              my: "10px",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            EDIT PRODUCT
          </Typography>
        ) : (
          <Typography
            variant="h5"
            align="center"
            sx={{
              my: "10px",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
            onClick={() => {
              setNewProduct({
                ...newProduct,
                name: "Dr. Bronner's Pure-Castile Liquid Soap ",
                image_url: "https://m.media-amazon.com/images/I/61mn58yB+pS.jpg",
                description: "Our most popular scent, with a peppermint burst so pure it tingles! Scented with organic peppermint oil to cool skin, clear sinuses and sharpen mind. Our Peppermint Pure-Castile Liquid Soap is concentrated, biodegradable, versatile and effective. Made with organic and certified fair trade ingredients. Organic hemp seed oil is now sourced in the U.S. following hemp legalization! Packaged in a 100% post-consumer recycled bottle. All-One!",
                url: "https://www.drbronner.com/collections/all/products/peppermint-pure-castile-liquid-soap",
                coupon_code: "25OFFDRBRONNER",
              });
            }}
          >
            ADD PRODUCT
          </Typography>
        )}
        <form
          onSubmit={productID ? handleUpdate : handleAdd}
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
              width: "80%",
            }}
          >
            <InputLabel>Name:</InputLabel>
            <TextField
              id="standard-basic"
              variant="outlined"
              type="text"
              // defaultValue={productID ? currentProduct?.name : ''}
              value={newProduct.name}
              onChange={(e) => handleChange(e, "name")}
              sx={{
                mt: "5px",
                mb: "15px",
              }}
              fullWidth
            />

            <InputLabel>Image URL:</InputLabel>
            <TextField
              id="standard-basic"
              variant="outlined"
              type="text"
              // defaultValue={productID ? currentProduct?.image_url : ''}
              value={newProduct.image_url}
              onChange={(e) => handleChange(e, "image_url")}
              sx={{
                mt: "5px",
                mb: "5px",
              }}
              fullWidth
            />
            {newProduct?.image_url ? (
              <CardMedia
                component="img"
                height="200"
                width="auto"
                image={newProduct?.image_url}
                alt="Image Preview"
                sx={{ mt: "3px", mb: "10px" }}
              />
            ) : ''}

            <InputLabel sx={{ mt: "15px", mb: "5px" }}>
              {" "}
              Product URL:{" "}
            </InputLabel>
            <TextField
              id="product-url"
              variant="outlined"
              type="text"
              // defaultValue={productID ? currentProduct?.url : ''}
              value={newProduct.url}
              onChange={(e) => handleChange(e, "url")}
              sx={{
                mb: "5px",
              }}
              fullWidth
            />
            {newProduct.url && (
              <Typography>
                <a href={newProduct.url} target="_blank" rel="noreferrer">
                  {newProduct.url}
                </a>
              </Typography>
            )}

            <InputLabel sx={{ mt: "20px" }}> Description: </InputLabel>
            <TextField
              multiline
              // defaultValue={productID ? currentProduct?.description : ''}
              value={newProduct.description}
              onChange={(e) => handleChange(e, "description")}
              fullWidth
              sx={{
                mt: "5px",
                mb: "10px",
              }}
              inputProps={{ maxLength: 240 }}
            ></TextField>
            <InputLabel sx={{ mt: "10px" }}> Coupon Code: </InputLabel>
            <TextField
              variant="outlined"
              type="text"
              // defaultValue={productID ? currentProduct?.coupon_code : ''}
              value={newProduct.coupon_code}
              onChange={(e) => handleChange(e, "coupon_code")}
              fullWidth
              sx={{
                mt: "5px",
                mb: "15px",
              }}
            />
            <InputLabel sx={{ mt: "3px" }}>
              Set Coupon Code Expiration
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                defaultValue={
                  productID ? dayjs(currentProduct?.coupon_expiration) : null
                }
                date={couponExpiration}
                minDate={dayjs()}
                onChange={(date) => setCouponExpiration(date)}
                fullWidth
                sx={{
                  mb: "15px",
                }}
              />
            </LocalizationProvider>
            {/* if edit mode, show public checkbox */}

            {productID ? (
              <Public productID={productID} currentProduct={currentProduct} />
            ) : (
              ""
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignSelf: "center",
              mt: "15px",
            }}
          >
            <Button
              variant="contained"
              type="button"
              onClick={() => setDisplayConfirmCancel(true)}
              color="warning"
              sx={{ color: "black" }}
            >
              Cancel
            </Button>
            {productID ? (
              <Button
                variant="contained"
                type="submit"
                sx={{ cursor: "pointer" }}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="contained"
                type="submit"
                sx={{ cursor: "pointer" }}
              >
                Add Product
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </>
  );
}

export default ProductForm;
