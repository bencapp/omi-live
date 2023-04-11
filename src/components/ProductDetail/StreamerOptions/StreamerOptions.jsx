import { Button } from "@mui/material";

function StreamerOptions({ setDisplayConfirmDelete }) {
  return (
    <>
      <Button
        color="warning"
        sx={{ color: "black" }}
        onClick={() => setDisplayConfirmDelete(true)}
      >
        DELETE PRODUCT
      </Button>
      <Button>EDIT PRODUCT INFO</Button>
    </>
  );
}

export default StreamerOptions;
