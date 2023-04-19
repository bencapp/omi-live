import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, FormControlLabel, Checkbox } from "@mui/material";

function Public({ currentProduct, productID }) {
  const dispatch = useDispatch();
  const [publicBool, setPublicBool] = useState(
    currentProduct.public ? currentProduct.public : false
  );

  useEffect(() => {
    if (currentProduct.public != undefined) {
      setPublicBool(currentProduct.public);
    }
  }, [currentProduct]);

  const handleChangePublic = (checked) => {
    dispatch({
      type: "UPDATE_PRODUCT_PUBLIC_STATUS",
      payload: { public: checked, productID: productID },
    });
    setPublicBool(checked);
  };

  return (
    <FormControlLabel
      label="PUBLIC"
      sx={{ height: "36.5px", marginBottom: "5px" }}
      control={
        <Checkbox
          // defaultChecked={currentProduct.public}
          checked={publicBool}
          onChange={(e) => handleChangePublic(e.target.checked)}
          inputProps={{ "aria-label": "controlled" }}
          // inputProps={{ "aria-label": "controlled" }}
        />
      }
    ></FormControlLabel>
  );
}
export default Public;
