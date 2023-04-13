import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function StreamerOptions({
  setDisplayConfirmDelete,
  setDisplayConfirmRemoveFromStream,
  productID,
}) {
  const dispatch = useDispatch();
  const inCurrentStream = useSelector(
    (store) => store.currentProduct.inCurrentStream
  );

  const currentStream = useSelector((store) => store.currentStream);

  useEffect(() => {
    dispatch({
      type: "FETCH_PRODUCT_IN_STREAM",
      payload: { productID: productID, streamID: currentStream.id },
    });
  }, []);

  const handleAddToStream = () => {
    dispatch({
      type: "ADD_PRODUCT_TO_STREAM",
      payload: { productID: productID, streamID: currentStream.id },
    });
    dispatch({
      type: "FETCH_STREAM_BY_ID",
      payload: { streamID: currentStream.id },
    });
    history.push("/edit-stream");
  };

  return (
    <>
      {/* if current stream has a scheduled time, display the remove  */}
      {Object.keys(currentStream).length > 0 && (
        <Box
          sx={{
            alignSelf: "end",
          }}
        >
          {inCurrentStream ? (
            <Button onClick={() => setDisplayConfirmRemoveFromStream(true)}>
              REMOVE FROM STREAM
            </Button>
          ) : (
            <Button onClick={handleAddToStream}>ADD TO STREAM</Button>
          )}
        </Box>
      )}

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
