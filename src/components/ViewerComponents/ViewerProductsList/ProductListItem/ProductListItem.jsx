import { Box, Grid, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";
import WishlistButton from "../../WishlistButton/WishlistButton";

function ProductListItem({ product }) {
  const theme = useTheme();
  const history = useHistory();

  const handleGoToProduct = () => {
    history.push(`/product/${product.id}`);
  };

  return (
    <Grid
      container
      sx={{
        borderRadius: "5px",
        padding: "10px",
        backgroundColor: theme.palette.secondary.main,
        height: "100%",
        m: "10px",
      }}
      onClick={handleGoToProduct}
    >
      <Grid item xs={3} sx={{ m: "5px" }}>
        <Box
          sx={{
            borderRadius: "5px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
            height: "100%",
          }}
        >
          <img
            style={{ height: "100%", borderRadius: "5px" }}
            alt={product.name}
            src={product.image_url}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={7}
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          placeContent: "center",
        }}
      >
        <Box>{product.name}</Box>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ display: "flex", placeContent: "center", alignItems: "center" }}
      >
        <WishlistButton type="icon" product={product} envType="product-list" />
      </Grid>
    </Grid>
  );
}

export default ProductListItem;
