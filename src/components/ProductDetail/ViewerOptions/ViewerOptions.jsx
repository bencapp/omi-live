import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import WishlistButton from "../../ViewerComponents/WishlistButton/WishlistButton";

function ViewerOptions({ setDisplayConfirmBuy }) {
  const dispatch = useDispatch();
  const currentProduct = useSelector((store) => store.currentProduct);

  const handleClickBuy = () => {
    setDisplayConfirmBuy(true);
    navigator.clipboard.writeText(currentProduct.coupon_code);
  };

  return (
    <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
      <Button onClick={handleClickBuy}>BUY</Button>
      <WishlistButton />
    </Box>
  );
}

export default ViewerOptions;
