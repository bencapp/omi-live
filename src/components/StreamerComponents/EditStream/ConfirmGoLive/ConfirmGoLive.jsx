import { Box, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function ConfirmGoLive({ setDisplayConfirmGoLive, streamID }) {
  const history = useHistory();
  const startStream = () => {
    // TODO: begin stream via OBS
    history.push(`/streamer-stream/${streamID}`);
  };
  return (
    <Box
      sx={{
        //   height: "250px",
        width: "80%",
        position: "absolute",
        borderRadius: "5px",
        backgroundColor: "white",
        margin: "-125px auto",
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
      <Box>Are you sure you are ready to make this stream go live?</Box>

      <Box sx={{ display: "flex", gap: "15px", alignSelf: "center" }}>
        <Button onClick={() => setDisplayConfirmGoLive(false)}>CANCEL</Button>
        <Button onClick={startStream}>CONFIRM</Button>
      </Box>
    </Box>
  );
}

export default ConfirmGoLive;
