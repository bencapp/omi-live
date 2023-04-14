import { Box, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function ConfirmEndStream({ setDisplayConfirmEndStream, streamID }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const endStream = () => {
    console.log("ending stream");
    // TODO: end stream for all users
    dispatch({ type: "END_STREAM", payload: streamID });
    history.push(`/home`);
  };
  return (
    <Box
      sx={{
        //   height: "250px",
        width: "80%",
        position: "absolute",
        borderRadius: "5px",
        backgroundColor: "white",
        margin: "38vh 4.75vw",
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
      <Box>Are you sure you want to end the stream?</Box>

      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <Button onClick={() => setDisplayConfirmEndStream(false)}>
          CANCEL
        </Button>
        <Button color="warning" sx={{ color: "black" }} onClick={endStream}>
          CONFIRM
        </Button>
      </Box>
    </Box>
  );
}

export default ConfirmEndStream;
