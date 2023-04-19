import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, Avatar } from "@mui/material";
import { useHistory } from "react-router";
import { useEffect } from "react";
import ProductListItem from "../../ViewerComponents/ViewerProductsList/ProductListItem/ProductListItem";

import { Button } from "@mui/material";

function StreamerProductsList() {
  const products = useSelector((store) => store.allProducts);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (product) => {
    console.log("Product id", product);
    history.push(`/product/${product.id}`);
  };

  useEffect(() => {
    dispatch({ type: "GET_PRODUCTS" });
  }, []);

  return (
    <div>
      {/* {JSON.stringify(products)} */}
      {products && products.length > 0 ? (
        <List>
          {products.map((product, i) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </List>
      ) : (
        <p>No products added yet.</p>
      )}
      <Button size="small" onClick={() => history.push(`/productform`)}>
        ADD NEW PRODUCT
      </Button>
    </div>
  );
}

export default StreamerProductsList;
