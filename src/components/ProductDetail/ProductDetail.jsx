import { useParams, useHistory } from "react-router-dom";
import { Box, Link, useTheme, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import ConfirmBuyPopup from "./ConfirmBuyPopup/ConfirmBuyPopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup/ConfirmDeletePopup";
import ViewerOptions from "./ViewerOptions/ViewerOptions";
import StreamerOptions from "./StreamerOptions/StreamerOptions";

function ProductDetail() {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const [displayConfirmBuy, setDisplayConfirmBuy] = useState(false);
  const [displayConfirmDelete, setDisplayConfirmDelete] = useState(false);

  const user = useSelector((store) => store.user);
  const currentProduct = useSelector((store) => store.currentProduct);

  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCT_BY_ID", payload: productID });
  }, []);

  const hideConfirmBuyPopup = () => {
    setDisplayConfirmBuy(false);
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
      {displayConfirmBuy && (
        <ConfirmBuyPopup hideConfirmBuyPopup={hideConfirmBuyPopup} />
      )}

      {displayConfirmDelete && (
        <ConfirmDeletePopup setDisplayConfirmDelete={setDisplayConfirmDelete} />
      )}

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
          <StreamerOptions setDisplayConfirmDelete={setDisplayConfirmDelete} />
        ) : (
          <ViewerOptions setDisplayConfirmBuy={setDisplayConfirmBuy} />
        )}
      </Box>
    </Box>
  );
}

export default ProductDetail;
