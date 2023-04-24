import { Box, Grid, Button, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

function StreamerControlsProduct({ product }) {
  const theme = useTheme();
  const currentProduct = useSelector((store) => store.currentProduct);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "10px",
        border: currentProduct.id == product.id ? "1px solid green" : "",
      }}
    >
      <Grid container key={product.id} alignItems="center">
        <Grid item xs={3}>
          <img style={{ height: "50px" }} src={product.image_url} />
        </Grid>
        <Grid item xs={9} sx={{ padding: "0px 10px" }}>
          <b>{product.name}</b>
          {currentProduct.id == product.id && (
            <Box>
              <Box>{product.description}</Box>
              <Box>Coupon Code: {product.coupon_code}</Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default StreamerControlsProduct;
