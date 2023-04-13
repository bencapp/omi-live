import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function ConfirmRemoveFromStream({
  setDisplayConfirmRemoveFromStream,
  productToRemove,
}) {
  const history = useHistory();
  const currentStream = useSelector((store) => store.currentStream);
  const dispatch = useDispatch();

  const removeFromStream = () => {
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

  return (
    <Box
      sx={{
        //   height: "250px",
        width: "80%",
        position: "absolute",
        borderRadius: "5px",
        backgroundColor: "white",
        margin: "-50px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
        padding: "20px",
        fontSize: "1.3rem",
        border: "1px solid black",
      }}
    >
      <Box>
        Are you sure you want to remove this product from stream{" "}
        <b>{currentStream.title}</b>?
      </Box>

      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <Button onClick={() => setDisplayConfirmRemoveFromStream(false)}>
          CANCEL
        </Button>
        <Button onClick={removeFromStream}>CONFIRM</Button>
      </Box>
    </Box>
  );
}

export default ConfirmRemoveFromStream;
