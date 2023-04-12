import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";

function StreamerOptions({
  setDisplayConfirmDelete,
  setDisplayConfirmRemoveFromStream,
  productID,
}) {
  const currentStream = useSelector((store) => store.currentStream);
  return (
    <>
      {/* if current stream has a scheduled time, display the remove  */}
      {Object.keys(currentStream).length > 0 && (
        <Box
          sx={{
            alignSelf: "end",
          }}
        >
          <Button onClick={() => setDisplayConfirmRemoveFromStream(true)}>
            REMOVE FROM STREAM
          </Button>
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
