import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

function ViewerOptions({ setDisplayConfirmBuy }) {
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

  const handleClickBuy = () => {
    setDisplayConfirmBuy(true);
    navigator.clipboard.writeText(currentProduct.coupon_code);
  };

  return (
    <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
      <Button onClick={handleClickBuy}>BUY</Button>
      {!currentProduct.on_user_wishlist ? (
        <Button onClick={handleSaveProduct}>ADD TO WISHLIST</Button>
      ) : (
        <Button onClick={handleUnSaveProduct}>ON WISHLIST</Button>
      )}
    </Box>
  );
}

export default ViewerOptions;
