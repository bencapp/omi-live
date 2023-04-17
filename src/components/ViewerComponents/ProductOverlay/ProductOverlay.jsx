import { useTheme, alpha, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { socket } from "../../../socket";

function ProductOverlay() {
  const theme = useTheme();
  const currentProduct = useSelector((store) => store.currentProduct);
  const currentStream = useSelector((store) => store.currentStream);

  useEffect(() => {
    socket.emit("join stream");
    const handleViewerCountUpdate = (count) => {
      console.log("updated viewer count, count is", count);
    };

    socket.on("update viewer count", (count) => handleViewerCountUpdate(count));
    return () => {
      socket.off("update viewer count", handleViewerCountUpdate);
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: alpha(theme.palette.secondary.main, 0.7),
        borderRadius: "15px",git 
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
