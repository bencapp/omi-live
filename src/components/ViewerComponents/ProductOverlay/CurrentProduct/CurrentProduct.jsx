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
      {type == "default" && <b>NOW FEATURING</b>}
      <Box sx={{ display: "flex", gap: "10px" }}>
        <img style={{ height: "65px" }} src={currentProduct.image_url}></img>
        <Box>
          <b>{currentProduct.name}</b>
          <br></br>
          {currentProduct.description}
        </Box>
        <WishlistButton product={currentProduct}/>
      </Box>
    </Box>
  );
}

export default CurrentProduct;
