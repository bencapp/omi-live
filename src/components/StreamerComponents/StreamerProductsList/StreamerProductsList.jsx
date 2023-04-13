import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, Avatar } from "@mui/material";
import { useHistory } from "react-router";
import { useEffect } from "react";

function StreamerProductsList() {
  const products = useSelector((store) => store.addProduct);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (product) => {
    console.log("Product id", product);
    history.push(`/product/${product.id}`);
  };

  useEffect(() => {
    dispatch({ type: "GET_PRODUCT" });
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
              sx={{ border: "1px solid grey", mb: 1, borderRadius: "10px" }}
              onClick={() => handleClick(product)}
            >
              <Avatar alt={product.name} src={product.image_url} />
              <ListItemText
                primary={product.name}
                secondary={product.description}
              />
              <p> Coupon Code: {product.couponCode}</p>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No products added yet.</p>
      )}
    </div>
  );
}

export default StreamerProductsList;
