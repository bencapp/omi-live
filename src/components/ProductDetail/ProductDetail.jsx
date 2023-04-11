import { useParams, useHistory } from "react-router-dom";
import { Box, Link, useTheme, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function ProductDetail() {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const user = useSelector((store) => store.user);
  const currentProduct = useSelector((store) => store.currentProduct);

  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCT_BY_ID", payload: productID });
  }, []);

  const handleSaveProduct = () => {
    // POST to users_products table
    dispatch({
      type: "ADD_PRODUCT_TO_WISHLIST",
      payload: { productID: currentProduct.id, userID: user.id },
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        width: "90%",
        margin: "auto",
        borderRadius: "5px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* <Box>Product Detail view for {productID}</Box>
      <Box>User isAdmin is {JSON.stringify(user.isAdmin)}</Box> */}
      <Box sx={{ fontWeight: "bold", fontSize: "1.5rem", alignSelf: "center" }}>
        {currentProduct.name}
      </Box>
      <img
        style={{ width: "250px", alignSelf: "center" }}
        src={currentProduct.image_url}
      />
      <Box>{currentProduct.description}</Box>
      <Box>DISCOUNT CODE: {currentProduct.coupon_code}</Box>
      <Box>Expires {currentProduct.coupon_expiration}</Box>
      {/* MUI link */}
      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        {user.isAdmin ? (
          <>
            <Button color="warning" sx={{ color: "black" }}>
              DELETE PRODUCT
            </Button>
            <Button>EDIT PRODUCT INFO</Button>
          </>
        ) : (
          <>
            <Button href={currentProduct.url}>BUY</Button>
            <Button onClick={handleSaveProduct}>ADD TO WISHLIST</Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductDetail;
