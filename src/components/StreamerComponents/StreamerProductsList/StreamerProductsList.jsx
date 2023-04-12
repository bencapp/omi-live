import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, Avatar } from "@mui/material";
import { useHistory } from "react-router";

function StreamerProductsList() {
  const products = useSelector((store) => store.addProduct);

  const history = useHistory();

  const handleClick = (product) => {
    console.log("Product id", product.id);
    history.push(`/product/${product.id}`);
  };

  return (
    <div>
      {products && products.length > 0 ? (
        <List>
          {products.map((product, index) => (
            <ListItem
              key={index}
              className="product-item"
              sx={{ border: "1px solid grey", mb: 1, borderRadius: "10px" }}
              onClick={() => handleClick(product)}
            >
              <Avatar alt={product.name} src={product.imageUrl} />
              <ListItemText
                primary={product.name}
                secondary={product.description}
              />
              <p> Coupon Code {product.couponCode}</p>
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
