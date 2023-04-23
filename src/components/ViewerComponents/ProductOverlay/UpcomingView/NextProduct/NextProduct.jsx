import { Box, alpha, useTheme } from "@mui/material";
import WishlistButton from "../../../WishlistButton/WishlistButton";

function NextProduct({ product }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: alpha(theme.palette.secondary.main, 0.9),
        width: "37vw",
        height: "18vh",
        border: `1px solid ${theme.palette.secondary.dark}`,
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        <Box sx={{ width: "90%" }}>
          <b>NEXT</b>
          <Box sx={{ fontSize: ".8rem" }}> {product.name}</Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            // height: "70%",
          }}
        >
          <Box sx={{ position: "absolute", right: "2px", top: "2px" }}>
            <WishlistButton product={product} envType="stream-overlay" />
          </Box>
          <img
            style={{
              height: "10vh",
            }}
            src={product.image_url}
          ></img>
        </Box>
      </Box>
    </Box>
  );
}

export default NextProduct;
