import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import EditStreamInfo from "../EditStreamInfo/EditStreamInfo";
import dayjs from "dayjs";

function EditStream() {
  const currentStream = useSelector((store) => store.currentStream);
  return (
    <Box sx={{ padding: "0px 20px" }}>
      {/* if stream does not have a date planned, render 'create a new stream'; else render 'edit stream' */}
      {!currentStream.scheduled ? (
        <EditStreamInfo />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box sx={{ fontSize: "1.5em", fontWeight: "bold" }}>EDIT STREAM</Box>
          <Box
            sx={{
              fontSize: "1.3em",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <b>{currentStream.title}</b>,{" "}
              {dayjs(currentStream.scheduled).format("DD/MM/YYYY")}
            </Box>
            <Button size="small">EDIT INFO</Button>
          </Box>
        </Box>
        // products list goes here
        // LIST
      )}
    </Box>
  );
}

export default EditStream;
