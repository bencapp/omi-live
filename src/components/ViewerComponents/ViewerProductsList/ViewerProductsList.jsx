import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

function StreamerProductsList() {
  const products = useSelector((store) => store.allProduct);

  const history = useHistory();
  const dispatch = useDispatch();

  const [wishlist, setWishlist] = useState({});

  const handleClick = (product) => {
    console.log("Product id", product);
    history.push(`/product/${product.id}`);
  };

  const handleAddToWishlist = (event, product) => {
    event.stopPropagation();
    console.log("Adding to wishlist", product);

    // Toggle the wishlist state for the current product
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [product.id]: !prevWishlist[product.id],
    }));
  };

  useEffect(() => {
    dispatch({ type: "GET_PRODUCT" });
  }, []);

  return (
    <div>
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
              <IconButton
                onClick={(event) => handleAddToWishlist(event, product)}
              >
                {wishlist[product.id] ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
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
