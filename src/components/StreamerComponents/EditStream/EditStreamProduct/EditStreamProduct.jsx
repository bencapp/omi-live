import { Grid, Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function EditStreamProduct({ product }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentStream = useSelector((store) => store.currentStream);

  const handleOrderIncrease = () => {
    dispatch({
      type: "ORDER_CHANGE",
      payload: {
        productID: product.id,
        order: product.order,
        currentStream: currentStream,
        type: "increase",
      },
    });
  };

  const handleOrderDecrease = () => {};

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
            onClick={handleOrderIncrease}
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
            onClick={handleOrderDecrease}
          >
            -
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditStreamProduct;
