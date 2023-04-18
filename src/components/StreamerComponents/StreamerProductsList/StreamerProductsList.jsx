import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, Avatar } from "@mui/material";
import { useHistory } from "react-router";
import { useEffect } from "react";

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
            <ListItem
              key={i}
              className="product-item"
              sx={{
                border: "1px solid grey",
                mb: 1,
                borderRadius: "10px",
                padding: "3px",
                backgroundColor: "#CBE5DF",
                wordBreak: "break-word",
              }}
              onClick={() => handleClick(product)}
            >
              <Avatar alt={product.name} src={product.image_url} sx={{ml: "5px", mr: "10px"}}/>
              <ListItemText
                primary={product.name}
                secondary={product.description}
              />
            </ListItem>
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
