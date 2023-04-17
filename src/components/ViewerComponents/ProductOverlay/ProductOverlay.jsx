import { useTheme, alpha, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { socket } from "../../../socket";

function ProductOverlay() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentProduct = useSelector((store) => store.currentProduct);
  const currentStream = useSelector((store) => store.currentStream);

  useEffect(() => {
    dispatch({ type: "FETCH_CURRENT_PRODUCT_IN_STREAM" });

    const handleProductChange = () => {
      dispatch({ type: "FETCH_CURRENT_PRODUCT_IN_STREAM" });
    };

    // listen for when the streamer updates the current product
    socket.on("product change", (product) => handleProductChange(product));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: alpha(theme.palette.secondary.main, 0.7),
        borderRadius: "15px",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        padding: "5px 15px",
        height: "140px",
        border: `1px solid ${theme.palette.secondary.dark}`,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <ExpandMoreIcon sx={{ alignSelf: "center" }} />
        <Box
          sx={{
            backgroundColor: alpha(theme.palette.secondary.main, 0.9),
            // width: "100%",
            height: "100%",
            border: `1px solid ${theme.palette.secondary.dark}`,
            borderRadius: "5px",
            padding: "5px",
            fontWeight: "bold",
          }}
        >
          Now Featuring
          <img></img>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductOverlay;
