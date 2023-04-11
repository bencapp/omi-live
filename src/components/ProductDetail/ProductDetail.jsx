import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
function ProductDetail() {
  const { productID } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCT_BY_ID", payload: productID });
  }, []);

  return (
    <Box>
      <Box>Product Detail view for {productID}</Box>
      <Box>User isAdmin is {JSON.stringify(user.isAdmin)}</Box>
    </Box>
  );
}

export default ProductDetail;
