import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

// type should be either 'add' or 'remove'
function WishlistButton({ product }) {
  const dispatch = useDispatch();

  const handleSaveProduct = () => {
    // POST to users_products table
    dispatch({
      type: "ADD_PRODUCT_TO_WISHLIST",
      payload: product.id,
    });
  };

  const handleUnSaveProduct = () => {
    dispatch({
      type: "REMOVE_PRODUCT_FROM_WISHLIST",
      payload: product.id,
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
