import { Grid, Box, useTheme } from "@mui/material";

function EditStreamProduct({ product }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "5px",
        padding: "10px",
        width: "100%",
      }}
    >
      <Grid container key={product.id} alignItems="center">
        <Grid
          item
          xs={1}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>{product.order}</div>
        </Grid>
        <Grid item xs={2}>
          <img src={product.image_url} />
        </Grid>
        <Grid item xs={8}>
          <b>{product.name}</b>
          <br></br>
          {product.description}
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          <Box
            sx={{
              width: "20px",
              height: "20px",
              backgroundColor: theme.palette.primary.main,
              color: "white",
              textAlign: "center",
            }}
          >
            +
          </Box>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              backgroundColor: theme.palette.primary.main,
              color: "white",
              textAlign: "center",
            }}
          >
            -
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditStreamProduct;
