import { Grid, Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
        display: "flex",
        alignItems: "center"
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
            borderRadius: "5px",
            ml: "5px"
          }}
          onClick={handleClickProduct}
        >
          <div>{product.order}</div>
        </Grid>
        <Grid item xs={2} onClick={handleClickProduct} sx={{ mx: "10px" }}>
          <img src={product.image_url} />
        </Grid>
        <Grid item xs={4} onClick={handleClickProduct} sx={{ textOverflow: 'ellipsis' }}>
          <b>{product.name}</b>
          <br></br>
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
              width: "40px",
              height: "20px",
              backgroundColor: theme.palette.primary.main,
              color: "white",
              textAlign: "center",
              p: "5px",
              borderRadius: "5px",
              ml: "10px",
              mb: "5px"
            }}
            onClick={handleOrderIncrease}
          >
            <KeyboardArrowUpIcon />
          </Box>
          <Box
            sx={{
              width: "40px",
              height: "20px",
              backgroundColor: theme.palette.primary.main,
              color: "white",
              textAlign: "center",
              p: "5px",
              borderRadius: "5px",
              ml: "10px",
              mb: "5px"
            }}
            onClick={handleOrderDecrease}
          >
            <KeyboardArrowDownIcon />
          </Box>
        </Grid>
        <Grid
          item xs={1}
          container
           >
          <Box
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: theme.palette.warning.main,
              color: "black",
              textAlign: "center",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-end",
              border: "1px solid gray"
            }}
            justifyContent="center"
            onClick={() => handleClickRemove(product)}
          >
            X
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditStreamProduct;
