import { Box, alpha, Button, Grid, useTheme } from "@mui/material";
import WishlistButton from "../../WishlistButton/WishlistButton";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BuyButton from "../../BuyButton/BuyButton";
import { useState } from "react";
import ConfirmationPopup from "../../../ConfirmationPopup/ConfirmationPopup";

function ExpandedView({ setOverlayView }) {
  const theme = useTheme();
  const currentProduct = useSelector((store) => store.currentProduct);
  const [displayConfirmBuy, setDisplayConfirmBuy] = useState(false);

  const handleBuy = () => {
    window.open(currentProduct.url, "_blank");
    setDisplayConfirmBuy(false);
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
          top="-2vh"
        />
      )}
      <Button
        size="small"
        sx={{ position: "absolute", marginTop: "1vh", marginLeft: "68vw" }}
        onClick={() => setOverlayView("expanded-upcoming")}
      >
        UPCOMING {">"}
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <ExpandMoreIcon onClick={() => setOverlayView("default")} />
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          {" "}
          <b>NOW FEATURING</b>
          <Box>{currentProduct.name}</Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            height: "25vh",
            alignItems: "center",
          }}
        >
          <img style={{ height: "20vh" }} src={currentProduct.image_url}></img>
          <Box sx={{ width: "40vw" }}>{currentProduct.description}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: "20px", justifySelf: "end" }}>
          {" "}
          <BuyButton setDisplayConfirmBuy={setDisplayConfirmBuy} />
          <WishlistButton
            product={currentProduct}
            type="button"
            envType="stream-overlay"
          />
        </Box>

        {/* <Box
          sx={{
            //   backgroundColor: alpha(theme.palette.secondary.main, 0.9),
            // width: "100%",
            height: "350px",
            //   border: `1px solid ${theme.palette.secondary.dark}`,
            borderRadius: "5px",
            padding: "5px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        ></Box> */}
      </Box>
    </>
  );
}

export default ExpandedView;
