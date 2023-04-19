import { Box, Grid, useTheme, Card, CardMedia, TableRow } from "@mui/material";
import { useHistory } from "react-router-dom";
import WishlistButton from "../../WishlistButton/WishlistButton";

function ProductListItem({ product }) {
  const theme = useTheme();
  const history = useHistory();

  const handleGoToProduct = () => {
    history.push(`/product/${product.id}`);
  };

  return (
    <Grid item xs={6}>
      <Card
        sx={{
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: theme.palette.secondary.main,
          height: "100%",
          m: "10px",
          width: "30vw",
        }}
        onClick={handleGoToProduct}
      >
        <Box
          sx={{
            borderRadius: "5px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.10)",
            height: "100%",
          }}
        >
          <CardMedia
            sx={{ height: "100%", borderRadius: "5px" }}
            component="img"
            image={product.image_url}
            alt={product.name}
          />
        </Box>
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
          <WishlistButton
            type="icon"
            product={product}
            envType="product-list"
          />
        </Box>
      </Card>
    </Grid>
  );
}

export default ProductListItem;
