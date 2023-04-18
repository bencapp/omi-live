import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Button, useTheme, Grid } from "@mui/material";
import EditStreamInfo from "../EditStreamInfo/EditStreamInfo";
import EditStreamProduct from "./EditStreamProduct/EditStreamProduct";
import dayjs from "dayjs";

import ConfirmRemoveFromStream from "./ConfirmRemoveFromStream/ConfirmRemoveFromStream";
import ConfirmGoLive from "./ConfirmGoLive/ConfirmGoLive";
import ConfirmDeleteStream from "./ConfirmDeleteStream/ConfirmDeleteStream";

function EditStream() {
  const { streamID } = useParams();
  const currentStream = useSelector((store) => store.currentStream);
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

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
    }
  }, []);

  // const handleCancelEditInfo = () => {
  //   setDisplayEditInfo(false);
  // };

  const handleRemoveFromStream = (product) => {
    setDisplayConfirmRemoveFromStream(true);
    setProductToRemove(product);
  };

  return (
    <Box sx={{ padding: "0px 20px" }}>
      {/* if stream does not have a date planned, render 'create a new stream'; else render 'edit stream' */}

      {!streamID || displayEditInfo ? (
        <EditStreamInfo setDisplayEditInfo={setDisplayEditInfo} />
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
            <Box sx={{ fontSize: "1.5em", fontWeight: "bold", mb: "10px"}}>
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
                  sx={{ color: "black", mb: "5px"}}
                >
                  DELETE STREAM
                </Button>
              </Grid>
            </Grid>
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
        </>
      )}
      {displayConfirmRemoveFromStream && (
        <ConfirmRemoveFromStream
          setDisplayConfirmRemoveFromStream={setDisplayConfirmRemoveFromStream}
          productToRemove={productToRemove}
        />
      )}
      {displayConfirmGoLive && (
        <ConfirmGoLive
          setDisplayConfirmGoLive={setDisplayConfirmGoLive}
          streamID={streamID}
        />
      )}
      {displayConfirmDeleteStream && (
        <ConfirmDeleteStream
          setDisplayConfirmDeleteStream={setDisplayConfirmDeleteStream}
          streamID={streamID}
        />
      )}
    </Box>
  );
}

export default EditStream;
