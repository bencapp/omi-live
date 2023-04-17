import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import WishlistButton from "../../ViewerComponents/WishlistButton/WishlistButton";
import BuyButton from "../../ViewerComponents/BuyButton/BuyButton";

function ViewerOptions({ setDisplayConfirmBuy }) {
  const dispatch = useDispatch();
  const currentProduct = useSelector((store) => store.currentProduct);

  return (
    <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
      <BuyButton setDisplayConfirmBuy={setDisplayConfirmBuy} />
      <WishlistButton product={currentProduct} />
    </Box>
  );
}

export default ViewerOptions;
