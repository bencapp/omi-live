import { Box, alpha, useTheme } from "@mui/material";
import WishlistButton from "../../../WishlistButton/WishlistButton";

function NextProduct({ product }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: alpha(theme.palette.secondary.main, 0.9),
        width: "37vw",
        height: "22vh",
        border: `1px solid ${theme.palette.secondary.dark}`,
        borderRadius: "5px",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "center",
      }}
    >
      <b>NEXT</b>
      <b>{product.name}</b>
      <img style={{ maxHeight: "100px" }} src={product.image_url}></img>
      <WishlistButton product={product} renderCurrent={false} envType='stream-overlay'/>
    </Box>
  );
}

export default NextProduct;
