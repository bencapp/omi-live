import { useParams } from "react-router-dom";
import Chat from "../../Chat/Chat";
import { Box, useTheme, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import StreamerControlsProduct from "../StreamerControlsProduct/StreamerControlsProduct";
import { socket } from "../../../socket";

function StreamerControls() {
  const { streamID } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [viewerCount, setViewerCount] = useState();

  const currentStream = useSelector((store) => store.currentStream);
  const currentProduct = useSelector((store) => store.currentProduct);

  useEffect(() => {
    dispatch({ type: "FETCH_STREAM_BY_ID", payload: { streamID: streamID } });
    dispatch({ type: "FETCH_CURRENT_PRODUCT_IN_STREAM" });
    socket.on("update viewer count", (count) => setViewerCount(count));
    return () => {
      socket.off("update viewer count", (count) => setViewerCount(count));
    };
  }, []);

  const handleNextProduct = () => {
    socket.emit("change current product", product, currentStream.id);
  };

  return (
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
        {/* {JSON.stringify(currentStream)} */}
        {/* <Box>{currentStream.products[0].name}</Box> */}
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            borderRight: "1px solid black",
            padding: "10px",
            gap: "10px",
          }}
        >
          {/* map over products here */}
          {currentStream.products.map((product) => (
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
            gap: "20px",
          }}
        >
          <Button onClick={handleNextProduct} size="small" color="primary">
            Next Item
          </Button>
          <Button size="small" color="warning" sx={{ color: "black" }}>
            End Stream
          </Button>
          <Box>[i] viewers</Box>
        </Grid>
      </Grid>
      <div
        style={{
          width: "100vw",
        }}
      >
        <Chat />
      </div>
    </Box>
  );
}

export default StreamerControls;
