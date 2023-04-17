import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, FormLabel, Checkbox } from "@mui/material";


function Public ({currentProduct, productID}) {
    const dispatch = useDispatch();
    const [publicBool, setPublicBool] = useState(false);
    
    const handleChangePublic = (checked) => {
        dispatch({
          type: "UPDATE_PRODUCT_PUBLIC_STATUS",
          payload: { public: checked, productID: productID },
        });
        setPublicBool(checked);
      };

      return (
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
      )
}
export default Public;


