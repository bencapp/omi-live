import { useTheme, alpha, Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { socket } from "../../../socket";

import DefaultView from "./DefaultView/DefaultView";
import ExpandedView from "./ExpandedView/ExpandedView";
import UpcomingView from "./UpcomingView/UpcomingView";

function ProductOverlay({ streamID }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { username } = useParams();

  const currentProduct = useSelector((store) => store.currentProduct);
  const currentStream = useSelector((store) => store.currentStream);

  const [overlayView, setOverlayView] = useState("default");

  useEffect(() => {
    dispatch({ type: "FETCH_CURRENT_STREAM_DATA" });

    const handleProductChange = () => {
      dispatch({ type: "FETCH_CURRENT_PRODUCT_IN_STREAM" });
    };

    // listen for when the streamer updates the current product
    socket.on("product change", (product) => handleProductChange(product));

    socket.off("product change", handleProductChange);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: alpha(theme.palette.secondary.main, 0.8),
        borderRadius: "15px",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        padding: "5px 15px",
        height: overlayView == "default" ? "15vh" : "40vh",
        border: `1px solid ${theme.palette.secondary.dark}`,
      }}
    >
      {overlayView == "default" ? (
        <DefaultView setOverlayView={setOverlayView} />
      ) : overlayView == "expanded" ? (
        <ExpandedView setOverlayView={setOverlayView} />
      ) : (
        <UpcomingView setOverlayView={setOverlayView} />
      )}
    </Box>
  );
}

export default ProductOverlay;
