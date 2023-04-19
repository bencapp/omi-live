import { useParams, useHistory } from "react-router-dom";
import { Box, Link, useTheme, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import ViewerOptions from "./ViewerOptions/ViewerOptions";
import StreamerOptions from "./StreamerOptions/StreamerOptions";

function ProductDetail() {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const user = useSelector((store) => store.user);
  const currentProduct = useSelector((store) => store.currentProduct);

  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCT_BY_ID", payload: productID });
  }, []);

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
      {/* <Box>Product Detail view for {productID}</Box>
      <Box>User isAdmin is {JSON.stringify(user.isAdmin)}</Box> */}
      <Box sx={{ fontWeight: "bold", fontSize: "1.5rem", alignSelf: "center" }}>
        {currentProduct.name}
      </Box>
      <img
        style={{ width: "250px", alignSelf: "center" }}
        src={currentProduct.image_url}
      />
      <Box>{currentProduct.description}</Box>
      <Box>DISCOUNT CODE: {currentProduct.coupon_code}</Box>
      <Box>Expires {currentProduct.coupon_expiration}</Box>
      {/* MUI link */}

      {user.isAdmin ? (
        <StreamerOptions productID={productID} />
      ) : (
        <ViewerOptions />
      )}
    </Box>
  );
}

export default ProductDetail;
