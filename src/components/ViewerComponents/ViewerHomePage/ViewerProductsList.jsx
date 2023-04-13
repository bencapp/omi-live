import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, Avatar } from "@mui/material";
import { useHistory } from "react-router";
import { useEffect } from "react";

function ViewerProductsList() {
  const products = useSelector((store) => store.allProduct);

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
    <div className="product-list">
      {products && products.length > 0 ? (
        <List>
          {products.map((product, i) => (
            <ListItem
              key={i}
              className="product-item"
              sx={{
                border: "1px solid grey",
                mb: 1,
                borderRadius: "15px",
                padding: "1px",
              }}
              onClick={() => handleClick(product)}
            >
              <Avatar
                alt={product.name}
                src={product.image_url}
                sx={{ height: "100px", width: "100px" }}
              />
              <ListItemText
                primary={product.name}
                secondary={product.description}
              />
              <p className="coupon-code"> Coupon Code: {product.couponCode}</p>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No products added yet.</p>
      )}
    </div>
  );
}

export default ViewerProductsList;
