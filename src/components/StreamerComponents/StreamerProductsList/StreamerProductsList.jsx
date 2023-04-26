import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, Avatar } from "@mui/material";
import { useHistory } from "react-router";
import { useEffect } from "react";
import ProductListItem from "../../ViewerComponents/ViewerProductsList/ProductListItem/ProductListItem";
import { Button, Box, Grid } from "@mui/material";

function StreamerProductsList() {
  const products = useSelector((store) => store.allProducts);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (product) => {
    history.push(`/product/${product.id}`);
  };

  useEffect(() => {
    dispatch({ type: "GET_PRODUCTS" });
  }, []);

  return (
    <>
      {products.length ? (
        <Grid container spacing={2}>
          {products.map((product, i) => (
            <Grid item key={product.id} xs={6}>
              <ProductListItem product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No products added yet.</p>
      )}
      <Button size="small" onClick={() => history.push(`/productform`)}>
        ADD NEW PRODUCT
      </Button>
    </>
  );
}

export default StreamerProductsList;
