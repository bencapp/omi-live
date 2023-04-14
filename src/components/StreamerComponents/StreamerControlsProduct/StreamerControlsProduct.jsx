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
        <Grid item xs={6}>
          <b>{product.name}</b>
        </Grid>

        <Grid item xs={3}>
          <Box>added</Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StreamerControlsProduct;
