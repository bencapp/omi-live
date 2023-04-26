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
    >
      <img src={product.image_url} style={{ height: "13vh" }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          placeContent: "center",
        }}
      >
        {product.name}
      </Box>
      <Box
        sx={{
          display: "flex",
          placeContent: "center",
          alignItems: "center",
        }}
      >
        <WishlistButton type="icon" product={product} envType="product-list" />
      </Box>
    </Paper>
  );
}

export default ProductListItem;
