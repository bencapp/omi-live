import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// type should be either 'add' or 'remove'
function WishlistButton() {
  const dispatch = useDispatch();
  const currentProduct = useSelector((store) => store.currentProduct);

  const handleSaveProduct = () => {
    // POST to users_products table
    dispatch({
      type: "ADD_PRODUCT_TO_WISHLIST",
      payload: currentProduct.id,
    });
  };

  const handleUnSaveProduct = () => {
    dispatch({
      type: "REMOVE_PRODUCT_FROM_WISHLIST",
      payload: currentProduct.id,
    });
  };

  return (
    <>
      {!currentProduct.on_user_wishlist ? (
        <Button onClick={handleSaveProduct}>ADD TO WISHLIST</Button>
      ) : (
        <Button onClick={handleUnSaveProduct}>ON WISHLIST</Button>
      )}
    </>
  );
}

export default WishlistButton;
