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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50vw",
            gap: "10px",
            padding: "3px",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>NOW FEATURING</Box>
          <Box>{currentProduct.name}</Box>
        </Box>

        <Box
          sx={{
            height: "10vh",
            position: "relative",
          }}
        >
          <Box sx={{ position: "absolute", right: "2px", top: "2px" }}>
            <WishlistButton
              product={currentProduct}
              renderCurrent={false}
              envType="stream-overlay"
            />
          </Box>

          <img
            style={{
              height: "10vh",
            }}
            src={currentProduct.image_url}
          ></img>
        </Box>
      </Box>
    </Box>
  );
}

export default CurrentProduct;
