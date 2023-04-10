import { useSelector } from "react-redux";
import { Box } from "@mui/material";
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
            gap: "5px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box sx={{ fontSize: "1.5em", fontWeight: "bold" }}>EDIT STREAM</Box>
          <Box sx={{ fontSize: "1.3em", alignSelf: "start" }}>
            {currentStream.title}
          </Box>
          <Box sx={{ alignSelf: "start" }}>
            {dayjs(currentStream.scheduled).format("DD/MM/YYYY")}
          </Box>
        </Box>
        // products list goes here
      )}
    </Box>
  );
}

export default EditStream;
