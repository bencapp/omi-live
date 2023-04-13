import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Button, useTheme } from "@mui/material";
import EditStreamInfo from "../EditStreamInfo/EditStreamInfo";
import EditStreamProduct from "./EditStreamProduct/EditStreamProduct";
import dayjs from "dayjs";

import ConfirmRemoveFromStream from "./ConfirmRemoveFromStream/ConfirmRemoveFromStream";

function EditStream() {
  const { streamID } = useParams();
  const currentStream = useSelector((store) => store.currentStream);
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  const [displayEditInfo, setDisplayEditInfo] = useState(false);
  const [displayConfirmRemoveFromStream, setDisplayConfirmRemoveFromStream] =
    useState(false);
  const [productToRemove, setProductToRemove] = useState();

  useEffect(() => {
    if (streamID) {
      dispatch({ type: "FETCH_STREAM_BY_ID", payload: { streamID: streamID } });
    }
  }, []);

  const handleCancelEditInfo = () => {
    setDisplayEditInfo(false);
  };

  const handleRemoveFromStream = (product) => {
    setDisplayConfirmRemoveFromStream(true);
    setProductToRemove(product);
  };

  return (
    <Box sx={{ padding: "0px 20px" }}>
      {/* if stream does not have a date planned, render 'create a new stream'; else render 'edit stream' */}

      {!streamID || displayEditInfo ? (
        <EditStreamInfo handleCancelEditInfo={handleCancelEditInfo} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
              EDIT STREAM
            </Box>
            <Box
              sx={{
                fontSize: "1.3em",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <b>{currentStream.title}</b>,{" "}
                {dayjs(currentStream.scheduled).format("MM/DD/YYYY")}
              </Box>
              <Button size="small" onClick={() => setDisplayEditInfo(true)}>
                EDIT INFO
              </Button>
            </Box>
            <Box sx={{ alignSelf: "start" }}>{currentStream.description}</Box>
            {/* && currentStream.products[0]?.name */}
            {currentStream.products && currentStream.products[0].id ? (
              currentStream.products
                .sort((a, b) => a.order - b.order)
                .map((product) => (
                  <EditStreamProduct
                    key={product.id}
                    product={product}
                    handleRemoveFromStream={handleRemoveFromStream}
                  />
                ))
            ) : (
              <Box>No products yet! Add one to get started.</Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                onClick={() =>
                  history.push(`/add-existing-product/${currentStream.id}`)
                }
                size="small"
              >
                ADD EXISTING PRODUCT
              </Button>
              <Button size="small">ADD NEW PRODUCT</Button>
            </Box>
            <Button sx={{ alignSelf: "end" }} color="warning">
              GO LIVE
            </Button>
          </Box>
        </>
      )}
      {displayConfirmRemoveFromStream && (
        <ConfirmRemoveFromStream
          setDisplayConfirmRemoveFromStream={setDisplayConfirmRemoveFromStream}
          productToRemove={productToRemove}
        />
      )}
    </Box>
  );
}

export default EditStream;
