import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Button, useTheme, Grid } from "@mui/material";
import EditStreamInfo from "../EditStreamInfo/EditStreamInfo";
import EditStreamProduct from "./EditStreamProduct/EditStreamProduct";
import dayjs from "dayjs";

import ConfirmationPopup from "../../ConfirmationPopup/ConfirmationPopup";

function EditStream() {
  const { streamID } = useParams();
  const currentStream = useSelector((store) => store.currentStream);
  const products = useSelector((store) => store.allProducts);
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  const [newStream, setNewStream] = useState();

  const [displayEditInfo, setDisplayEditInfo] = useState(false);
  const [displayConfirmRemoveFromStream, setDisplayConfirmRemoveFromStream] =
    useState(false);
  const [displayConfirmGoLive, setDisplayConfirmGoLive] = useState(false);
  const [displayConfirmDeleteStream, setDisplayConfirmDeleteStream] =
    useState(false);

  const [productToRemove, setProductToRemove] = useState();

  useEffect(() => {
    if (streamID) {
      dispatch({ type: "FETCH_STREAM_BY_ID", payload: { streamID: streamID } });
    } else {
      setNewStream(true);
    }
  }, []);

  const handleClickRemove = (product) => {
    setDisplayConfirmRemoveFromStream(true);
    setProductToRemove(product);
  };

  const removeFromStream = (product) => {
    dispatch({
      type: "REMOVE_PRODUCT_FROM_STREAM",
      payload: { streamID: currentStream.id, productID: productToRemove.id },
    });
    setDisplayConfirmRemoveFromStream(false);
    dispatch({
      type: "FETCH_STREAM_BY_ID",
      payload: { streamID: currentStream.id },
    });
  };

  const startStream = () => {
    // TODO: begin stream via OBS
    history.push(`/streamer-stream/${streamID}`);
    dispatch({ type: "START_STREAM", payload: streamID });
  };

  const deleteStream = () => {
    // TODO: end stream for all users
    dispatch({ type: "DELETE_STREAM", payload: streamID });
    history.push("/home");
  };

  const closeEditStreamInfo = () => {
    setNewStream(false);
    setDisplayEditInfo(false);
  };

  return (
    <>
      {displayConfirmRemoveFromStream && (
        <ConfirmationPopup
          setDisplayConfirmation={setDisplayConfirmRemoveFromStream}
          handleConfirm={removeFromStream}
          alertText={`Are you sure you want to remove this product from the stream?`}
          hidePopupText="CANCEL"
          confirmPopupText="CONFIRM"
          top="40vh"
        />
      )}
      {displayConfirmGoLive && (
        <ConfirmationPopup
          setDisplayConfirmation={setDisplayConfirmGoLive}
          handleConfirm={startStream}
          alertText={`Are you sure you are ready to make this stream go live?`}
          hidePopupText="CANCEL"
          confirmPopupText="CONFIRM"
          top="40vh"
        />
      )}
      {displayConfirmDeleteStream && (
        <ConfirmationPopup
          setDisplayConfirmation={setDisplayConfirmDeleteStream}
          handleConfirm={deleteStream}
          alertText={`Are you sure you want to delete the stream?`}
          hidePopupText="CANCEL"
          confirmPopupText="CONFIRM"
          top="40vh"
        />
      )}
      {newStream || displayEditInfo ? (
        <EditStreamInfo
          newStream={newStream}
          closeEditStreamInfo={closeEditStreamInfo}
        />
      ) : (
        <></>
      )}
      {!newStream && (
        <Box sx={{ padding: "0px 20px" }}>
          {/* if stream does not have a date planned, render 'create a new stream'; else render 'edit stream' */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box sx={{ fontSize: "1.5em", fontWeight: "bold", mb: "10px" }}>
              EDIT STREAM
            </Box>
            <Grid
              container
              sx={{
                fontSize: "1.3em",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                xs={7}
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <Box>
                  <b>{currentStream.title}</b>
                  <Box>
                    {dayjs(currentStream.scheduled).format("MM/DD/YYYY")}
                  </Box>
                </Box>
                <Box sx={{ alignSelf: "start", fontSize: "1rem" }}>
                  {currentStream.description}
                </Box>
              </Grid>
              <Grid
                item
                xs={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                  gap: "10px",
                }}
              >
                <Button size="small" onClick={() => setDisplayEditInfo(true)}>
                  EDIT INFO
                </Button>
                <Button
                  onClick={() => {
                    setDisplayConfirmDeleteStream(true);
                  }}
                  size="small"
                  color="warning"
                  sx={{ color: "black", mb: "5px" }}
                >
                  DELETE STREAM
                </Button>
              </Grid>
            </Grid>
            {/* && currentStream.products[0]?.name */}
            {currentStream.products && currentStream.products[0].id ? (
              <Box sx={{ maxHeight: "62vh", overflow: "scroll" }}>
                {currentStream.products
                  .sort((a, b) => a.order - b.order)
                  .map((product) => (
                    <EditStreamProduct
                      key={product.id}
                      product={product}
                      handleClickRemove={handleClickRemove}
                    />
                  ))}
              </Box>
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
              <Button size="small" onClick={() => history.push(`/productform`)}>
                ADD NEW PRODUCT
              </Button>
            </Box>
            <Button
              onClick={() => {
                setDisplayConfirmGoLive(true);
              }}
              sx={{ alignSelf: "end" }}
              color="warning"
            >
              GO LIVE
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default EditStream;
