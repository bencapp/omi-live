import { Button, Box } from "@mui/material";

function StreamerOptions({ setDisplayConfirmDelete }) {
  return (
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
  );
}

export default StreamerOptions;
