import { Box, Grid, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";
import WishlistButton from "../../WishlistButton/WishlistButton";

function ViewerProductListItem({ product }) {
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
        height: "11vh",
        overflow: "hidden",
      }}
      // onClick={() => handleClick(product)}
    >
      <Grid item xs={3} onClick={handleGoToProduct}>
        <img
          style={{ height: "75px" }}
          alt={product.name}
          src={product.image_url}
        />
      </Grid>
      <Grid item xs={7} onClick={handleGoToProduct}>
        <Box>
          <b>{product.name}</b>
        </Box>
        <Box>{product.description}</Box>
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", placeContent: "center" }}>
        <WishlistButton
          type="icon"
          product={product}
          renderCurrent={false}
          envType="product-list"
        />
      </Grid>
    </Grid>
  );
}

export default ViewerProductListItem;
