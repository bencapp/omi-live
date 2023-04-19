import { Box, alpha, Button, useTheme } from "@mui/material";
import WishlistButton from "../../WishlistButton/WishlistButton";
import { useSelector } from "react-redux";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import BuyButton from "../../BuyButton/BuyButton";
import { useState } from "react";
import NextProduct from "./NextProduct/NextProduct";
import CurrentProduct from "../CurrentProduct/CurrentProduct";

function UpcomingView({ setOverlayView }) {
  const theme = useTheme();
  const currentProduct = useSelector((store) => store.currentProduct);
  const currentStream = useSelector((store) => store.currentStream);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ExpandLessIcon
        onClick={() => setOverlayView("default")}
        sx={{ alignSelf: "center" }}
      />
      <Button
        size="small"
        sx={{ position: "absolute", marginTop: "3vh", marginLeft: "1vw" }}
        onClick={() => setOverlayView("expanded")}
      >
        {"<"} CURRENT
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <b>UPCOMING</b>
        <Box sx={{ height: "3px" }}></Box>
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <CurrentProduct type={"upcoming"} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* {JSON.stringify(currentStream.products)} */}
            {currentStream.products.find(
              (product) => product.order == currentProduct.order + 1
            ) && (
              <NextProduct
                product={currentStream.products.find(
                  (product) => product.order == currentProduct.order + 1
                )}
              />
            )}
            {currentStream.products.find(
              (product) => product.order == currentProduct.order + 2
            ) && (
              <NextProduct
                product={currentStream.products.find(
                  (product) => product.order == currentProduct.order + 2
                )}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UpcomingView;
