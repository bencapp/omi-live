import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import WishlistButton from "../../ViewerComponents/WishlistButton/WishlistButton";
import BuyButton from "../../ViewerComponents/BuyButton/BuyButton";
import ConfirmationPopup from "../../ConfirmationPopup/ConfirmationPopup";

function ViewerOptions() {
  const dispatch = useDispatch();
  const currentProduct = useSelector((store) => store.currentProduct);

  const [displayConfirmBuy, setDisplayConfirmBuy] = useState(false);

  const handleBuy = () => {
    window.location.href = currentProduct.url;
  };

  return (
    <>
      {displayConfirmBuy && (
        <ConfirmationPopup
          setDisplayConfirmation={setDisplayConfirmBuy}
          handleConfirm={handleBuy}
          alertText={`Discount code ${currentProduct.coupon_code} copied to clipboard. Continue
        to vendor site to purchase?`}
          hidePopupText="KEEP SHOPPING"
          confirmPopupText="CONTINUE"
        />
      )}

      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <BuyButton setDisplayConfirmBuy={setDisplayConfirmBuy} />
        <WishlistButton
          product={currentProduct}
          type="button"
          envType="product-detail"
        />
      </Box>
    </>
  );
}

export default ViewerOptions;
