import { Box, alpha, Button, useTheme } from "@mui/material";
import WishlistButton from "../../WishlistButton/WishlistButton";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BuyButton from "../../BuyButton/BuyButton";
import { useState } from "react";
import ConfirmBuyPopup from "../../../ProductDetail/ConfirmBuyPopup/ConfirmBuyPopup";

function ExpandedView({ setOverlayView }) {
  const theme = useTheme();
  const currentProduct = useSelector((store) => store.currentProduct);
  const [displayConfirmBuy, setDisplayConfirmBuy] = useState(false);

  const hideConfirmBuyPopup = () => {
    setDisplayConfirmBuy(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {displayConfirmBuy && (
        <ConfirmBuyPopup hideConfirmBuyPopup={hideConfirmBuyPopup} />
      )}
      <ExpandMoreIcon
        onClick={() => setOverlayView("default")}
        sx={{ alignSelf: "center" }}
      />
      <Button
        size="small"
        sx={{ position: "absolute", marginTop: "3vh", marginLeft: "66vw" }}
        onClick={() => setOverlayView("expanded-upcoming")}
      >
        UPCOMING {">"}
      </Button>
      <Box
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
      >
        <b>NOW FEATURING</b>
        <Box>{currentProduct.name}</Box>
        <img style={{ height: "150px" }} src={currentProduct.image_url}></img>
        <Box
          sx={{
            alignSelf: "start",
            display: "flex",
            flexDirection: "column",
            gap: "5px",

            height: "100px",
          }}
        >
          <b>Description</b>
          {currentProduct.description}
        </Box>
        <Box sx={{ display: "flex", gap: "20px", justifySelf: "end" }}>
          {" "}
          <BuyButton setDisplayConfirmBuy={setDisplayConfirmBuy} />
          <WishlistButton product={currentProduct} type="button" />
        </Box>
      </Box>
    </Box>
  );
}

export default ExpandedView;
