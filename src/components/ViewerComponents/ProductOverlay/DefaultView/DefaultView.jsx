import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Box, alpha, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import CurrentProduct from "../CurrentProduct/CurrentProduct";

function DefaultView({ setOverlayView }) {
  const theme = useTheme();
  const currentProduct = useSelector((store) => store.currentProduct);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ExpandLessIcon
        onClick={() => setOverlayView("expanded")}
        sx={{ alignSelf: "center" }}
      />
      <CurrentProduct type={"default"} />
    </Box>
  );
}

export default DefaultView;
