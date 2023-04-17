import { Button, Box} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import component to make public
import Public from "../Public/Public";

function StreamerOptions({
  setDisplayConfirmDelete,
  setDisplayConfirmRemoveFromStream,
  productID,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const inCurrentStream = useSelector(
    (store) => store.currentProduct.inCurrentStream
  );

  const currentStream = useSelector((store) => store.currentStream);
  const currentProduct = useSelector((store) => store.currentProduct);

  useEffect(() => {
    if (currentStream.id) {
      dispatch({
        type: "FETCH_PRODUCT_IN_STREAM",
        payload: { productID: productID, streamID: currentStream.id },
      });
    }
  }, []);

  return (
    <>
      <Public currentProduct={currentProduct} productID={productID} />
      {/* if current stream has a scheduled time, display the remove  */}
      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <Button
          color="warning"
          sx={{ color: "black" }}
          onClick={() => setDisplayConfirmDelete(true)}
        >
          DELETE PRODUCT
        </Button>
        <Button
          onClick={() => history.push(`/productform/${productID}`)}
        >EDIT PRODUCT INFO</Button>
      </Box>
    </>
  );
}

export default StreamerOptions;
