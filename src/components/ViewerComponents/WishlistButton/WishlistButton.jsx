import { Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

// renderCurrent is a boolean for whether the product is the current one
// type is either 'button' or 'icon'
function WishlistButton({ product, renderCurrent, type }) {
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(true);

  useEffect(() => {
    if (renderCurrent === false) {
      console.log("rendered wishlist button for non-current product", product);
      setCurrent(false);
    }
  }, []);

  const handleSaveProduct = () => {
    // POST to users_products table
    dispatch({
      type: "ADD_PRODUCT_TO_WISHLIST",
      payload: { productID: product.id, current: current },
    });
  };

  const handleUnSaveProduct = () => {
    dispatch({
      type: "REMOVE_PRODUCT_FROM_WISHLIST",
      payload: { productID: product.id, current: current },
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
          <FavoriteBorderOutlinedIcon onClick={handleSaveProduct} />
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
        <FavoriteIcon onClick={handleUnSaveProduct} />
      )}
    </>
  );
}

export default WishlistButton;
