import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, Avatar } from "@mui/material";
import { useHistory } from "react-router";
import { useEffect } from "react";

function WishlistPage() {
  const products = useSelector((store) => store.allProduct);

  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "GET_PRODUCT" });
  }, []);

  const handleClick = (product) => {
    console.log("Product id", product);
    history.push(`/product/${product.id}`);
  };

  const wishlistProducts = products.filter(products.id);

  return (
    <div>
      {wishlistProducts.length ? (
        <List>
          {wishlistProducts.map((product, i) => (
            <ListItem
              key={i}
              className="product-item"
              sx={{
                border: "1px solid grey",
                mb: 1,
                borderRadius: "10px",
                padding: "1px",
                backgroundColor: "#CBE5DF",
              }}
              onClick={() => handleClick(product)}
            >
              <Avatar alt={product.name} src={product.image_url} />
              <ListItemText
                primary={product.name}
                secondary={product.description}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No items in wishlist.</p>
      )}
    </div>
  );
}

export default WishlistPage;
