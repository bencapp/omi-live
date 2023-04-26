import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ProductListItem from "./ProductListItem/ProductListItem";

// if wishlist is true, then filter only items that have been saved
function ViewerProductsList({ wishlist }) {
  const products = useSelector((store) => store.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_PRODUCTS" });
  }, []);

  return (
    <Grid container justifyContent="center">
      {products.length ? (
        wishlist ? (
          products
            .filter((product) => product.on_user_wishlist)
            .map((product) => (
              <Grid
                item
                key={product.id}
                xs={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ProductListItem product={product} />
              </Grid>
            ))
        ) : (
          products.map((product) => (
            <Grid item key={product.id} xs={6}>
              <ProductListItem product={product} />
            </Grid>
          ))
        )
      ) : (
        <p>No products added yet.</p>
      )}
    </Grid>
  );
}

export default ViewerProductsList;
