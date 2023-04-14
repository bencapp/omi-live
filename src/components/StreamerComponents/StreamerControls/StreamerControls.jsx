import { useParams } from "react-router-dom";
import Chat from "../Chat/Chat";
import { Box, useTheme, Button } from "@mui/material";

function StreamerControls() {
  const { streamID } = useParams();
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100vw",
          height: "28vh",
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Button color="warning" sx={{ color: "black" }}>
          Next Item
        </Button>
      </Box>
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
