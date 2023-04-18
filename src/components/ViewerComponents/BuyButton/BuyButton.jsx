import { Button } from "@mui/material";
import { useSelector } from "react-redux";

function BuyButton({ setDisplayConfirmBuy }) {
  const currentProduct = useSelector((store) => store.currentProduct);
  const handleClickBuy = () => {
    setDisplayConfirmBuy(true);
    navigator.clipboard.writeText(currentProduct.coupon_code);
  };

  return <Button onClick={handleClickBuy}>BUY</Button>;
}

export default BuyButton;
