import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, FormLabel, Checkbox } from "@mui/material";


function Public ({currentProduct, productID}) {
    const dispatch = useDispatch();
    const [publicBool, setPublicBool] = useState(currentProduct.public ? currentProduct.public : false);

    useEffect(() => {
      if (currentProduct.public != undefined) {
        setPublicBool(currentProduct.public)
      }
    },[currentProduct])
    
    const handleChangePublic = (checked) => {
        dispatch({
          type: "UPDATE_PRODUCT_PUBLIC_STATUS",
          payload: { public: checked, productID: productID },
        });
        setPublicBool(checked);
      };
      console.log(currentProduct)
      return (
        <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <FormLabel>
          PUBLIC
          <Checkbox
            // defaultChecked={currentProduct.public}
            checked={publicBool}
            onChange={(e) => handleChangePublic(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
            // inputProps={{ "aria-label": "controlled" }}
          />
        </FormLabel>
      </Box>
      )
}
export default Public;


