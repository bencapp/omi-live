import { Box, Grid, useTheme, Card, CardMedia, Paper } from "@mui/material";
import { useHistory } from "react-router-dom";
import WishlistButton from "../../WishlistButton/WishlistButton";

function ProductListItem({ product }) {
  const theme = useTheme();
  const history = useHistory();

  const handleGoToProduct = () => {
    history.push(`/product/${product.id}`);
  };

  return (
    <Paper
      sx={{
        borderRadius: "5px",
        padding: "10px",
        backgroundColor: theme.palette.secondary.main,
        m: "10px",
        height: "20vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onClick={handleGoToProduct}
    >
      <Box
        sx={{
          height: "10vh",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", right: "2px", top: "2px" }}>
          <WishlistButton
            type="icon"
            product={product}
            envType="product-list"
          />
        </Box>
        <img
          style={{
            height: "13vh",
          }}
          src={product.image_url}
        ></img>
      </Box>
      <Box
        sx={{
          marginTop: "4vh",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {product.name}
      </Box>
    </Paper>
  );
}

export default ProductListItem;
