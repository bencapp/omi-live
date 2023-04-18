import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// currentBool is a boolean for whether the product is the current one
function WishlistButton({ product, renderCurrent }) {
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
        <Button size="small" onClick={handleSaveProduct}>
          ADD TO WISHLIST
        </Button>
      ) : (
        <Button size="small" onClick={handleUnSaveProduct}>
          ON WISHLIST
        </Button>
      )}
    </>
  );
}

export default WishlistButton;
