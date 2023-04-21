import { Box, useTheme, alpha } from "@mui/material";
import WishlistButton from "../../WishlistButton/WishlistButton";
import { useSelector } from "react-redux";

function CurrentProduct({ type }) {
  const theme = useTheme();
  const currentProduct = useSelector((store) => store.currentProduct);
  return (
    <Box
      sx={{
        backgroundColor: alpha(theme.palette.secondary.main, 0.9),
        height: "100%",
        border: `1px solid ${theme.palette.secondary.dark}`,
        borderRadius: "5px",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {type == "default" && <b>NOW FEATURING</b>}
          {currentProduct.name}
        </Box>

        <Box sx={{ height: "15vh", position: "relative" }}>
          <Box sx={{ position: "absolute", right: "2px", top: "2px" }}>
            <WishlistButton
              product={currentProduct}
              renderCurrent={false}
              envType="stream-overlay"
            />
          </Box>
          <img
            style={{
              height: "15vh",
              width: "100%",
            }}
            src={currentProduct.image_url}
          ></img>
        </Box>
      </Box>
    </Box>
  );
}

export default CurrentProduct;
