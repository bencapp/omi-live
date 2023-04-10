import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import EditStreamNameDate from "../EditStreamNameDate/EditStreamNameDate";

function EditStream() {
  const currentStream = useSelector((store) => store.currentStream);
  return (
    <Box sx={{ padding: "0px 20px" }}>
      {/* if stream does not have a date planned, render 'create a new stream'; else render 'edit stream' */}
      {!currentStream.scheduled ? (
        <EditStreamNameDate />
      ) : (
        <div>Create STREAM"</div>
      )}
    </Box>
  );
}

export default EditStream;
