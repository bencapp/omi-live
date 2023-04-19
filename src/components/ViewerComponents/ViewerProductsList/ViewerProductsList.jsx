import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProductListItem from "./ProductListItem/ProductListItem";

// if wishlist is true, then filter only items that have been saved
function ViewerProductsList({ wishlist }) {
  const products = useSelector((store) => store.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_PRODUCTS" });
    console.log(wishlist);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {products.length ? (
        wishlist ? (
          products
            .filter((product) => product.on_user_wishlist)
            .map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))
        ) : (
          products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))
        )
      ) : (
        <p>No products added yet.</p>
      )}
    </Box>
  );
}

export default ViewerProductsList;
