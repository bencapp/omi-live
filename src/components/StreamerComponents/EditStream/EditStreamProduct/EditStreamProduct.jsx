import { Grid, Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function EditStreamProduct({ product, handleClickRemove }) {
  const history = useHistory();
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

  const handleOrderDecrease = () => {
    dispatch({
      type: "ORDER_CHANGE",
      payload: {
        productID: product.id,
        order: product.order,
        currentStream: currentStream,
        type: "decrease",
      },
    });
  };

  const handleClickProduct = () => {
    history.push(`/product/${product.id}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "5px",
        padding: "10px",
        width: "100%",
        overflow: "hidden",
        height: "11vh",
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
          onClick={handleClickProduct}
        >
          <div>{product.order}</div>
        </Grid>
        <Grid item xs={2} onClick={handleClickProduct}>
          <img src={product.image_url} />
        </Grid>
        <Grid item xs={7} onClick={handleClickProduct}>
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
        <Grid item xs={1}>
          <Box
            sx={{
              width: "20px",
              height: "20px",
              backgroundColor: theme.palette.warning.main,
              color: "black",
              textAlign: "center",
            }}
            onClick={() => handleClickRemove(product)}
          >
            x
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditStreamProduct;
