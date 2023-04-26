import { Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

// envType is the environment in which the button exists.
// this determines how the add and remove sagas deal with the requests
// type is either 'button' or 'icon'
function WishlistButton({ product, envType, type }) {
  const dispatch = useDispatch();

  const handleSaveProduct = () => {
    // POST to users_products table
    dispatch({
      type: "ADD_PRODUCT_TO_WISHLIST",
      payload: { productID: product.id, envType: envType },
    });
  };

  const handleUnSaveProduct = () => {
    dispatch({
      type: "REMOVE_PRODUCT_FROM_WISHLIST",
      payload: { productID: product.id, envType: envType },
    });
  };

  return (
    <>
      {!product.on_user_wishlist ? (
        type == "button" ? (
          <Button
            onClick={handleSaveProduct}
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            size="small"
          >
            <FavoriteBorderOutlinedIcon />
            ADD TO WISHLIST
          </Button>
        ) : (
          <FavoriteBorderOutlinedIcon
            color="primary"
            onClick={handleSaveProduct}
          />
        )
      ) : type == "button" ? (
        <Button
          onClick={handleUnSaveProduct}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          size="small"
        >
          {" "}
          <FavoriteIcon />
          ON WISHLIST
        </Button>
      ) : (
        <FavoriteIcon color="primary" onClick={handleUnSaveProduct} />
      )}
    </>
  );
}

export default WishlistButton;
