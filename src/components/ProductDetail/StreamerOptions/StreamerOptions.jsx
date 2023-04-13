import { Button, Box, Checkbox, FormLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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

  const [publicBool, setPublicBool] = useState(false);

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

  const handleChangePublic = (checked) => {
    dispatch({
      type: "UPDATE_PRODUCT_PUBLIC_STATUS",
      payload: { public: checked, productID: productID },
    });
    setPublicBool(checked);
  };

  return (
    <>
      {/* if current stream has a scheduled time, display the remove  */}
      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <FormLabel>
          PUBLIC
          <Checkbox
            defaultChecked={currentProduct.public}
            checked={publicBool}
            onChange={(e) => handleChangePublic(e.target.checked)}
            // inputProps={{ "aria-label": "controlled" }}
          />
        </FormLabel>
      </Box>

      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <Button
          color="warning"
          sx={{ color: "black" }}
          onClick={() => setDisplayConfirmDelete(true)}
        >
          DELETE PRODUCT
        </Button>
        <Button>EDIT PRODUCT INFO</Button>
      </Box>
    </>
  );
}

export default StreamerOptions;
