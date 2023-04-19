import { Button, Box, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import component to make public
import Public from "../Public/Public";
import ConfirmationPopup from "../../ConfirmationPopup/ConfirmationPopup";

function StreamerOptions({ productID }) {
  const [displayConfirmDelete, setDisplayConfirmDelete] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const inCurrentStream = useSelector(
    (store) => store.currentProduct.inCurrentStream
  );

  const currentStream = useSelector((store) => store.currentStream);
  const currentProduct = useSelector((store) => store.currentProduct);

  const handleDelete = () => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: productID,
    });
    history.push("/home/:products");
  };

  useEffect(() => {
    if (currentStream.id) {
      dispatch({
        type: "FETCH_PRODUCT_IN_STREAM",
        payload: { productID: productID, streamID: currentStream.id },
      });
    }
  }, []);

  const handleBuy = () => {
    window.open(currentProduct.url, "_blank");
  };

  return (
    <>
      {displayConfirmDelete && (
        <ConfirmationPopup
          setDisplayConfirmation={setDisplayConfirmDelete}
          handleConfirm={handleDelete}
          alertText="Are you sure you want to delete this product from the database?"
          hidePopupText="CANCEL"
          confirmPopupText="CONFIRM"
          top="38vh"
        />
      )}

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        // rowSpacing={1}
        sx={{ width: "100%" }}
      >
        <Grid item xs={6} sx={{ display: "flex", placeContent: "center" }}>
          <Public currentProduct={currentProduct} productID={productID} />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", placeContent: "end" }}>
          <Button sx={{ height: "36.5px" }} onClick={handleBuy}>
            VISIT SITE LINK
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            color="warning"
            sx={{ color: "black" }}
            onClick={() => setDisplayConfirmDelete(true)}
          >
            DELETE PRODUCT
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => history.push(`/productform/${productID}`)}>
            EDIT PRODUCT INFO
          </Button>
        </Grid>
      </Grid>
      {/* if current stream has a scheduled time, display the remove  */}
    </>
  );
}

export default StreamerOptions;
