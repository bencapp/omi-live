import { Box, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function ConfirmDeleteStream({ setDisplayConfirmDeleteStream, streamID }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteStream = () => {
    console.log("deleting stream");
    // TODO: end stream for all users
    dispatch({ type: "DELETE_STREAM", payload: streamID });
    history.push("/home");
  };
  return (
    <Box
      sx={{
        width: "80%",
        position: "absolute",
        borderRadius: "5px",
        backgroundColor: "white",
        margin: "-200px auto",
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
      <Box>Are you sure you want to delete the stream?</Box>

      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <Button onClick={() => setDisplayConfirmDeleteStream(false)}>
          CANCEL
        </Button>
        <Button color="warning" sx={{ color: "black" }} onClick={deleteStream}>
          CONFIRM
        </Button>
      </Box>
    </Box>
  );
}

export default ConfirmDeleteStream;
