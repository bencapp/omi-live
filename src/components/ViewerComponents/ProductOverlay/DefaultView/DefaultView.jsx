import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, alpha, useTheme } from "@mui/material";
import WishlistButton from "../../WishlistButton/WishlistButton";
import { useSelector } from "react-redux";
import CurrentProduct from "../CurrentProduct/CurrentProduct";

function DefaultView({ setOverlayView }) {
  const theme = useTheme();
  const currentProduct = useSelector((store) => store.currentProduct);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ExpandMoreIcon
        onClick={() => setOverlayView("expanded")}
        sx={{ alignSelf: "center" }}
      />
      <CurrentProduct type={"default"} />
    </Box>
  );
}

export default DefaultView;
