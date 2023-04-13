import { Box, Grid, Button, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function AddExistingProductItem({ product }) {
  const history = useHistory();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [inStream, setInStream] = useState();
  const currentStream = useSelector((store) => store.currentStream);

  useEffect(() => {
    // dispatch({
    //   type: "FETCH_PRODUCT_IN_STREAM",
    //   payload: { streamID: currentStream.id, productID: product.id },
    // });
  }, []);

  const handleClickProduct = () => {
    history.push(`/product/${product.id}`);
  };

  const handleAddToStream = () => {
    dispatch({
      type: "ADD_PRODUCT_TO_STREAM",
      payload: { productID: product.id, streamID: currentStream.id },
    });
    dispatch({
      type: "FETCH_STREAM_BY_ID",
      payload: { streamID: currentStream.id },
    });
  };

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
        <Grid item xs={3} onClick={handleClickProduct}>
          <img style={{ height: "70px" }} src={product.image_url} />
        </Grid>
        <Grid item xs={6} onClick={handleClickProduct}>
          <b>{product.name}</b>
          <br></br>
          {product.description}
        </Grid>

        <Grid item xs={3}>
          {currentStream.products?.find(
            (streamProduct) => streamProduct.id == product.id
          ) ? (
            <Box>Added</Box>
          ) : (
            <Button onClick={handleAddToStream}>ADD</Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddExistingProductItem;
