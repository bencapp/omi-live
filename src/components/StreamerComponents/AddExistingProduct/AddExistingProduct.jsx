import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";

import AddExistingProductItem from "./AddExistingProductItem/AddExistingProductItem";
import { Box, Button } from "@mui/material";

function AddExistingProduct() {
  const { streamID } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentStream = useSelector((store) => store.currentStream);
  const products = useSelector((store) => store.allProducts);

  useEffect(() => {
    dispatch({ type: "GET_PRODUCTS" });
    dispatch({ type: "FETCH_STREAM_BY_ID", payload: { streamID: streamID } });
  }, []);

  return (
    <Box sx={{ padding: "0px 20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ fontSize: "1.5em", fontWeight: "bold", textAlign: "center" }}
        >
          ADD PRODUCT TO STREAM
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Box sx={{ fontSize: "1.3em", width: "60%" }}>
            Adding to <b>{currentStream.title}</b>
            <br></br>
            {dayjs(currentStream.scheduled).format("MM/DD/YYYY")}
          </Box>
          <Button
            size="small"
            sx={{ height: "30px", alignSelf: "center" }}
            onClick={() => history.push(`/edit-stream/${streamID}`)}
          >
            BACK TO STREAM
          </Button>
        </Box>
        <Box
          sx={{
            height: "80vh",

            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            overflow: "scroll",
            // paddingRight: "20px",
          }}
        >
          {products &&
            products
              .sort((a, b) => a.order - b.order)
              .map((product) => (
                <AddExistingProductItem key={product.id} product={product} />
              ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AddExistingProduct;
