import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

function ConfirmBuyPopup({ hideConfirmBuyPopup }) {
  const currentProduct = useSelector((store) => store.currentProduct);
  return (
    <Box
      sx={{
        //   height: "250px",
        width: "80%",
        position: "absolute",
        borderRadius: "5px",
        backgroundColor: "white",
        margin: "225px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
        padding: "20px",
        fontSize: "1.3rem",
        zIndex: "10",
      }}
    >
      <Box>
        Discount code {currentProduct.coupon_code} copied to clipboard. Continue
        to vendor site to purchase?
      </Box>

      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <Button onClick={() => hideConfirmBuyPopup()}>KEEP SHOPPING</Button>
        <Button href={currentProduct.url}>CONTINUE</Button>
      </Box>
    </Box>
  );
}

export default ConfirmBuyPopup;
