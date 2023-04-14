import { Box, Grid, Button, useTheme } from "@mui/material";

function StreamerControlsProduct({ product }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "10px",
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
