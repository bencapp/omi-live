import { useParams } from "react-router-dom";
import Chat from "../../Chat/Chat";
import { Box, useTheme, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import StreamerControlsProduct from "../StreamerControlsProduct/StreamerControlsProduct";
import ConfirmationPopup from "../../ConfirmationPopup/ConfirmationPopup";
import { socket } from "../../../socket";

function StreamerControls() {
  const { streamID } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  const [viewerCount, setViewerCount] = useState(0);
  const [displayConfirmEndStream, setDisplayConfirmEndStream] = useState(false);
  const [onLastProduct, setOnLastProduct] = useState();
  const [onFirstProduct, setOnFirstProduct] = useState();

  const currentStream = useSelector((store) => store.currentStream);
  const currentProduct = useSelector((store) => store.currentProduct);

  useEffect(() => {
    dispatch({
      type: "FETCH_STREAM_ON_START_STREAM",
      payload: { streamID: streamID },
    });

    // TODO: send socket emit when a viewer joins a stream
    socket.on("update viewer count", (count) => setViewerCount(count));
    return () => {
      socket.off("update viewer count", (count) => setViewerCount(count));
    };
  }, []);

  const handleChangeProduct = (type) => {
    const product = currentStream.products.find(
      (product) => product.id == currentProduct.id
    );
    const newOrder = type == "previous" ? product.order - 1 : product.order + 1;
    const nextProduct = currentStream.products.find(
      (product) => product.order == newOrder
    );
    dispatch({
      type: "SET_CURRENT_PRODUCT_IN_STREAM",
      payload: { product: nextProduct, streamID: streamID },
    });
  };

  const endStream = () => {
    // TODO: end stream for all users
    dispatch({ type: "END_STREAM", payload: streamID });
    history.push(`/home`);
  };

  return (
    <>
      {displayConfirmEndStream && (
        <ConfirmationPopup
          setDisplayConfirmation={setDisplayConfirmEndStream}
          handleConfirm={endStream}
          alertText={`Are you sure you want to end the stream?`}
          hidePopupText="CANCEL"
          confirmPopupText="CONFIRM"
          top="38vh"
        />
      )}
      <Box
        sx={{
          width: "100vw",
          position: "fixed",
          bottom: "0",
        }}
      >
        <Chat height={"60vh"} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Grid
          container
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          {/* <Box>{currentStream.products[0].name}</Box> */}
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100vh",
              overflow: "scroll",
              borderRight: "1px solid black",
              padding: "10px",
              gap: "10px",
            }}
          >
            {/* map over products here */}
            {currentStream.products
              ?.sort((a, b) => a.order - b.order)
              .map((product) => (
                <StreamerControlsProduct key={product.id} product={product} />
              ))}
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              padding: "20px 10px",
              gap: "15px",
            }}
          >
            <Button
              onClick={() => handleChangeProduct("previous")}
              size="small"
              color="primary"
            >
              Previous
            </Button>
            <Button
              onClick={() => handleChangeProduct("next")}
              size="small"
              color="primary"
            >
              Next
            </Button>
            <Button
              onClick={() => setDisplayConfirmEndStream(true)}
              size="small"
              color="warning"
              sx={{ color: "black" }}
            >
              End Stream
            </Button>
            <Box>{viewerCount} viewers</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default StreamerControls;
